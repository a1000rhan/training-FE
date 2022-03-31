import React from "react";
import { StyleSheet, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";

import CustomDrawerContent from "./CustomDrawerContent";
import CourseList from "../components/Course/CourseList";
import UserProfile from "../components/Profile/UserProfile";
import Requests from "../components/Requests/Requests";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="CourseList"
        component={CourseList}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="home-outline" size={size} color={"#173E7A"} />
          ),
          drawerActiveBackgroundColor: "#edeff2",
          drawerLabel: "Course List",
          drawerLabelStyle: { color: "#173E7A", fontWeight: "bold" },
          headerShown: false,
          headerTitleStyle: { fontSize: 40, color: "white" },
        }}
      />
      <Drawer.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          drawerIcon: ({ size }) => (
            <Icon2 name="profile" size={size} color={"#173E7A"} />
          ),
          drawerActiveBackgroundColor: "#edeff2",
          drawerLabel: "Profile",
          drawerLabelStyle: { color: "#173E7A", fontWeight: "bold" },
          headerShown: false,
          headerTitleStyle: { fontSize: 40, color: "white" },
        }}
      />
      <Drawer.Screen
        name="Requests"
        component={Requests}
        options={{
          drawerIcon: ({ size }) => (
            <Icon2 name="solution1" size={size} color={"#173E7A"} />
          ),
          drawerActiveBackgroundColor: "#edeff2",
          drawerLabel: "Requests",
          drawerLabelStyle: { color: "#173E7A", fontWeight: "bold" },
          headerTitleStyle: { fontSize: 40, color: "white" },
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  username: {
    marginLeft: 10,
    fontWeight: "bold",
  },

  logText: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});
