import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import authStore from "../../stores/AuthStore";
import Loading from "../Loading";
const Requests = ({ navigation }) => {
  if (authStore.user?.type === "admin" && !authStore.profile) {
    authStore.fetchAllProfiles();
  }
  if (authStore.profileLoading) {
    return <Loading />;
  }
  const requests = authStore.profile.map((profile) =>
    profile.courses.map((course) => (
      <View>
        <Text>{course.profileStatus}</Text>
      </View>
    ))
  );

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
      {requests}
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
