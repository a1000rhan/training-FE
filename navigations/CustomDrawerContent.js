import React from "react";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import COLORS from "../color";
import authStore from "../stores/AuthStore";
import { observer } from "mobx-react";

// import { observer } from "mobx-react";

function CustomDrawerContent(props) {
  console.log(authStore.user);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.user}>
        <Avatar.Image
          size={40}
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
          }}
        />
        <Text style={styles.username}>
          {authStore.user ? authStore.user.staffId : "User"}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          width: "80%",
          alignSelf: "center",
        }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default observer(CustomDrawerContent);

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
  logout: ({ pressed }) => [
    {
      backgroundColor: pressed ? COLORS.secondary : "white",
      width: "95%",
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 20,
    },
  ],
  logText: {
    fontWeight: "bold",
    marginLeft: 10,
    color: COLORS.main,
  },
});
