import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const Requests = ({ navigation }) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            color={"white"}
            style={styles.ico1}
            name="reorder-three"
            size={30}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Requests;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#B92F1A",
    height: 230,
    borderRadius: 20,
    display: "flex",

    flexDirection: "row",
  },
  icon: {
    marginTop: 50,

    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    width: "100%",
  },
  ico1: {
    marginLeft: 15,
  },
});
