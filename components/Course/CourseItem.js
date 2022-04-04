import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {} from "../../Notification";
import { Button } from "react-native-paper";
import { Avatar, useToast } from "native-base";
import courseStore from "../../stores/courseStore";
import { baseURL } from "../../stores/api";
import authStore from "../../stores/AuthStore";
import Loading from "../Loading";

const CourseItem = ({ course, navigation }) => {
  console.log(
    "🚀 ~ file: CourseItem.js ~ line 19 ~ CourseItem ~ course",
    course
  );
  const toast = useToast();
  if (authStore.loading || authStore.profileLoading) {
    <Loading />;
  }
  const handleRemove = () => {
    courseStore.deleteCourse(course._id, navigation);
  };
  const theStudent = course.students?.some(
    (student) => (student._id || student) === authStore.profile?._id
  );

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { course: course });
      }}
    >
      <View style={styles.card}>
        <ImageBackground
          imageStyle={styles.bgCard}
          style={styles.bgItem}
          source={
            course.image
              ? { uri: baseURL + course.image }
              : require("../../assets/Lesson-amico.png")
          }
        >
          <View style={styles.txt}>
            <Text style={styles.courseTitle}>{course.title}</Text>
          </View>
          {authStore.user?.type === "student" ? (
            theStudent ? (
              <Button>Enrolled</Button>
            ) : (
              <Button
                style={styles.btn}
                justifyContent={"center"}
                color={"white"}
                onPress={() =>
                  courseStore.joinCourse(course, navigation, toast)
                }
              >
                <Text style={styles.btnTxt}>Enroll</Text>
              </Button>
            )
          ) : (
            <Button
              style={styles.btn2}
              justifyContent={"center"}
              color={"white"}
              onPress={handleRemove}
            >
              <Text style={styles.btnTxt}>Delete</Text>
            </Button>
          )}
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
    alignSelf: "center",
    shadowColor: "#000",
    borderRadius: 20,
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

  bgCard: {
    paddingTop: 250,

    opacity: 0.2,
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#4f5156",
  },
  country: {
    marginTop: 10,
  },
  btn: {
    height: 45,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#173E7A",
  },
  btn2: {
    height: 45,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#B92F1A",
  },
  btnTxt: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },
});
