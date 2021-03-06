import React from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Chip } from "react-native-paper";
import { observer } from "mobx-react";
import COLORS from "../../color";
import courseStore from "../../stores/courseStore";
import authStore from "../../stores/AuthStore";
import { Button, useToast } from "native-base";

import Loading from "../Loading";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CourseDetails = ({ route, navigation }) => {
  const course = route.params.course;
  console.log(
    "🚀 ~ file: CourseDetails.js ~ line 18 ~ CourseDetails ~ course",
    course
  );
  const toast = useToast();

  if (courseStore.loading) {
    <Loading />;
  }
  const skillsArr = course.skills.map((skill, index) => (
    <Chip key={index} style={styles.skl}>
      <Text style={styles.txtSkill}>{skill}</Text>
    </Chip>
  ));

  const handleRemove = () => {
    courseStore.deleteCourse(course._id, navigation);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            color={"white"}
            name="arrow-back-circle-sharp"
            style={{ marginLeft: 15 }}
            size={35}
            onPress={() => navigation.navigate("Drawer")}
          />
          {authStore.user.type === "student" ? (
            <></>
          ) : (
            <Icon2
              color={"white"}
              name="update"
              style={{ marginRight: 15 }}
              size={35}
              onPress={() =>
                navigation.navigate("UpdateCourse", { course: course })
              }
            />
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.Title}>{course.title}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.subTitle}>Description</Text>
          <Text style={styles.txt}>{course.description}</Text>

          <Text style={styles.subTitle}>Time</Text>
          <Text style={styles.txt}>Time: {course.time}</Text>
          <Text style={styles.txt}>Date: {course.date}</Text>

          <Text style={styles.subTitle}>Skills</Text>
          <View style={styles.bubbles}>{skillsArr}</View>

          <Text style={styles.subTitle}>Available Seats</Text>
          <Text style={styles.txt}>{course.maxSeats}</Text>

          <Text style={styles.subTitle}>Location</Text>
          <Text style={styles.txt}>{course.location}</Text>
        </View>
        {/* {course.students.some((student) => student === authStore.profile._id)()} */}
        {authStore.user?.type === "student" ? (
          <Button
            style={styles.btn}
            onPress={() => courseStore.joinCourse(course, navigation, toast)}
          >
            Enroll
          </Button>
        ) : (
          <Button style={styles.btn2} onPress={handleRemove}>
            Delete
          </Button>
        )}
      </ScrollView>
    </>
  );
};

export default observer(CourseDetails);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#B92F1A",
    height: 230,
    borderRadius: 20,
    display: "flex",
    marginBottom: 10,
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

  card: {
    width: "85%",
    paddingLeft: 20,
    paddingBottom: 20,
    flex: 1,
    shadowColor: "#000",
    borderRadius: 20,
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
  titleContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: windowHeight / 7,
    marginLeft: windowHeight / 20,
    position: "absolute",
  },
  Title: {
    fontSize: 40,

    color: "white",
    fontWeight: "bold",
  },
  btn: {
    height: 50,
    width: "85%",
    backgroundColor: COLORS.blue,
    marginTop: 20,
    borderRadius: 7,
    alignSelf: "center",
  },
  btn2: {
    height: 50,
    width: "85%",
    backgroundColor: COLORS.red,
    marginTop: 20,
    borderRadius: 7,
    alignSelf: "center",
  },

  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f5156",
    marginBottom: 6,
    marginTop: 20,
  },
  txt: {
    color: "#4f5156",
  },
  bubbles: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skl: {
    margin: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 12,
  },
  txtSkill: { color: "white", fontWeight: "bold" },
  btn: {
    height: 50,
    width: "75%",
    backgroundColor: COLORS.blue,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontWeight: "bold", color: "#fff", fontSize: 15 },
});
