import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import requestStore from "../../stores/requestStore";
import Loading from "../Loading";
import { useToast } from "native-base";

const RequestCard = ({ request }) => {
  if (requestStore.loading) {
    <Loading />;
  }
  const toast = useToast();

  return (
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
        {request.status == "pending" ? (
          <View style={{ flexDirection: "row" }}>
            <Button
              style={styles.btn}
              onPress={() => requestStore.approveCourse(request._id, toast)}
            >
              <Icon name="checkmark-sharp" size={30} color={"white"} />
            </Button>
            <Button
              style={styles.btn2}
              onPress={() => requestStore.rejectRequest(request._id, toast)}
            >
              <Icon2 name="cancel" size={30} color={"white"} />
            </Button>
          </View>
        ) : (
          <Text
            style={{
              fontWeight: "bold",
              color: request.status === "approved" ? "green" : "red",
            }}
          >
            {request.status.toUpperCase()}
          </Text>
        )}
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  card: {
    width: "85%",
    padding: 10,
    flex: 1,
    marginBottom: 10,
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
    justifyContent: "space-evenly",
    marginBottom: 10,
    padding: 10,
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
    width: "50%",
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
