import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import CourseList from "../components/Course/CourseList";
import CourseDetails from "../components/Course/CourseDetails";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="CourseList"
        options={{ headerShown: false }}
        component={CourseList}
      />
      <Stack.Screen
        name="Details"
        options={{ headerShown: false }}
        component={CourseDetails}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
