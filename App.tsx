import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/AppNavigator";
import {
  useFonts,
  AbrilFatface_400Regular,
} from "@expo-google-fonts/abril-fatface";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    AbrilFatface_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
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
