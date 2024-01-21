import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/AppNavigator";
import {
  useFonts,
  AbrilFatface_400Regular,
} from "@expo-google-fonts/abril-fatface";
import { createTables } from "./src/services/DatabaseService";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  React.useEffect(() => {
    createTables();
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    AbrilFatface_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
          <Toast />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
