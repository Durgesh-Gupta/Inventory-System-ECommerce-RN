// DatabaseService.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";
// Initialize Expo SQLite database
const db = SQLite.openDatabase("inventory.db");

const createTables = () => {
  // Create tables for users
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT CHECK(length(password) >= 6))"
    );
  });
};

const insertUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (_, results) => {
          resolve(results.insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [email],
        (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const authenticateUser = async (email, password) => {
  try {
    console.log("email, password", email, password);
    const user = await findUserByEmail(email);
    if (user) {
      if (user.password === password) {
        await AsyncStorage.setItem("userId", user.id.toString());
        return user;
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid Email or Password!",
        });
      }
    } else {
      console.log("------------->");
      Toast.show({
        type: "error",
        text1: "Invalid Email or Password!",
      });
    }
    return null;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const getCurrentUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    return userId ? parseInt(userId, 10) : null;
  } catch (error) {
    throw error;
  }
};

const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("userId");
  } catch (error) {
    throw error;
  }
};

export {
  createTables,
  insertUser,
  authenticateUser,
  getCurrentUserId,
  logoutUser,
};
