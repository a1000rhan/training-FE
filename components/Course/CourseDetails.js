import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Chip } from "react-native-paper";

const CourseDetails = ({ route, navigation }) => {
  const course = route.params.course;

  const skillsArr = course.skills.map((skill, index) => (
    <Chip key={index} style={styles.skl}>
      <Text style={styles.txtSkill}>{skill}</Text>
    </Chip>
  ));

  return (
    <>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            color={"white"}
            name="arrow-back-circle-sharp"
            size={35}
            onPress={() => {
              navigation.navigate("Drawer");
            }}
          />
        </View>
        <Text style={styles.Title}>{course.title}</Text>
      </View>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.subTitle}>Description</Text>
          <Text style={styles.txt}>{course.description}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.subTitle}>Skills</Text>
          <View style={styles.bubbles}>{skillsArr}</View>
        </View>
      </ScrollView>
    </>
  );
};

export default CourseDetails;

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
    marginLeft: 15,
    zIndex: 10,
  },

  card: {
    width: "95%",
    padding: 10,
    flex: 1,
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
  Title: {
    fontSize: 30,
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f5156",
    marginBottom: 5,
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
    backgroundColor: "#B92F1A",
  },
  txtSkill: { color: "white", fontWeight: "bold" },
});
