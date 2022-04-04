import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import CourseDetails from "../components/Course/CourseDetails";
import DrawerNavigator from "./DrawerNavigator";
import CourseList from "../components/Course/CourseList";
import Signup from "../components/AuthUser/Signup";
import AddCourse from "../components/NewCourse/AddCourse";
import Signin from "../components/AuthUser/Signin";
import Categories from "../components/NewCourse/Categories";
import UpdateCourse from "../components/UpdateCourse/UpdateCourse";
import UpdateCategories from "../components/UpdateCourse/UpdateCategories";

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
        name="Signin"
        options={{ headerShown: false }}
        component={Signin}
      />
      <Stack.Screen
        name="Signup"
        options={{ headerShown: false }}
        component={Signup}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Details"
        component={CourseDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCourse"
        component={AddCourse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateCourse"
        component={UpdateCourse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateCategories"
        component={UpdateCategories}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
