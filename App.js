import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigations/StackNavigator";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <NativeBaseProvider>
          <StackNavigator />
        </NativeBaseProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
