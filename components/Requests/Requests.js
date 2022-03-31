import { ScrollView } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import authStore from "../../stores/AuthStore";
import requestStore from "../../stores/requestStore";
import Loading from "../Loading";
const Requests = ({ navigation }) => {
  if (requestStore.loading) {
    <Loading />;
  }
  requestStore.fetchUserProfile();

  const requests = requestStore.requests.map((request) => (
    <View style={styles.card}>
      <View style={styles.l1}>
        <Text style={styles.name}>
          {request.firstName} {request.lastName}
        </Text>
        <Text>{request.course.date}</Text>
      </View>
      <View style={styles.l2}>
        <Text>Staff ID: </Text>
        <Text style={styles.staffId}>{request.user.staffId}</Text>
      </View>
      <View style={styles.l3}>
        <Text style={styles.courseTitle}>{request.course.title}</Text>
        <View style={{ flexDirection: "row" }}>
          <Button style={styles.btn}>
            <Icon name="checkmark-sharp" size={30} color={"white"} />
          </Button>
          <Button style={styles.btn2}>
            <Icon2 name="cancel" size={30} color={"white"} />
          </Button>
        </View>
      </View>
    </View>
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
        </View>
      </View>
      <ScrollView>{requests}</ScrollView>
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
  card: {
    width: "85%",
    padding: 10,
    flex: 1,
    marginBottom: 30,
    shadowColor: "#000",
    borderRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    marginTop: 10,
    alignSelf: "center",
    elevation: 8,
  },
  l1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  l2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  l3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#173E7A",
  },
  staffId: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#173E7A",
  },
  courseTitle: {
    fontSize: 20,
  },
  btn: {
    height: 45,
    width: 10,
    margin: 5,
    backgroundColor: "green",
  },
  btn2: {
    height: 45,
    width: 10,
    margin: 5,
    backgroundColor: "#B92F1A",
  },
});
