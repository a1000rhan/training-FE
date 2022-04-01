import { ScrollView } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import requestStore from "../../stores/requestStore";
import { observer } from "mobx-react";

import Loading from "../Loading";
import RequestCard from "./RequestCard";
const Requests = ({ navigation }) => {
  if (requestStore.loading) {
    <Loading />;
  }

  const requests = requestStore.requests.map((request) => (
    <RequestCard request={request} key={request._id} />
  ));

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
          <Text>Requests</Text>
        </View>
      </View>
      <ScrollView>{requests}</ScrollView>
    </>
  );
};

export default observer(Requests);

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
