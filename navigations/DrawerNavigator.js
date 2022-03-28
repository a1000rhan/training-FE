import React from "react";
import { StyleSheet, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

import CustomDrawerContent from "./CustomDrawerContent";
import CourseList from "../components/Course/CourseList";

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
          drawerIcon: ({ color }) => {
            <Icon name="home-outline" size={22} />;
          },
          drawerActiveBackgroundColor: "#E7E6FF",
          drawerLabelStyle: { color: "#6867AC", fontWeight: "bold" },
          headerTitle: () => {
            <Text>
              {"Maids"}
              <Icon name="home-outline" size={22} />
            </Text>;
          },
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
