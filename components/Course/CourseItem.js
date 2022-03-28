import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Button } from "react-native-paper";
import { Avatar } from "native-base";

const CourseItem = ({ course, navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { course: course });
      }}
    >
      <View style={styles.card}>
        <ImageBackground
          imageStyle={styles.bg}
          style={styles.bgItem}
          source={require("../../assets/Lesson-amico.png")}
        >
          <View style={styles.txt}>
            <Text style={styles.courseTitle}>{course.title}</Text>
          </View>

          <Button style={styles.btn} justifyContent={"center"} color={"white"}>
            <Text style={styles.btnTxt}>Enroll</Text>
          </Button>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  card: {
    width: "95%",
    height: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    margin: 10,
    elevation: 8,
  },
  bg: {
    paddingTop: 200,
    width: "70%",
  },
  bgItem: {
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  txt: {
    width: "50%",
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f5156",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6867AC",
  },
  country: {
    marginTop: 10,
  },
  btn: {
    height: 45,
    width: 100,

    backgroundColor: "#173E7A",
  },
  btnTxt: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },
});
