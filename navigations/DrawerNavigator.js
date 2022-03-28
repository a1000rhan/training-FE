import React from "react";
import { StyleSheet, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

import CustomDrawerContent from "./CustomDrawerContent";
import CourseList from "../components/Course/CourseList";
import UserProfile from "../components/Profile/UserProfile";

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
          drawerIcon: () => {
            <Icon name="home-outline" size={22} />;
          },
          drawerActiveBackgroundColor: "#edeff2",
          drawerLabelStyle: { color: "#173E7A", fontWeight: "bold" },
          headerShown: false,
          headerTitleStyle: { fontSize: 40, color: "white" },
        }}
      />
      <Drawer.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          drawerIcon: () => {
            <Icon name="home-outline" size={22} />;
          },
          drawerActiveBackgroundColor: "#edeff2",
          drawerLabelStyle: { color: "#173E7A", fontWeight: "bold" },
          headerShown: false,
          headerTitleStyle: { fontSize: 40, color: "white" },
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
