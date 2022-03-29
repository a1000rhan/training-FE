import React from "react";
import { ScrollView, StyleSheet, Text, View,Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Chip } from "react-native-paper";
import courseStore from "../../stores/courseStore";
import { Button } from "native-base";
import COLORS from "../../color";
import authStore from "../../stores/AuthStore";
import { observer } from "mobx-react";
import Icon2 from "react-native-vector-icons/AntDesign";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CourseDetails = ({ route, navigation }) => {
  const course = route.params.course;

  if(courseStore.loading){<Text>loading</Text>}
  const skillsArr = course.skills?.map((skill, index) => (
    <Chip key={index} style={styles.skl}>
      <Text style={styles.txtSkill}>{skill}</Text>
    </Chip>
  ));

  const handleRemove = () => {
    courseStore.deleteCourse(course._id);
    navigation.navigate("CourseList");
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            color={"white"}
            name="arrow-back-circle-sharp"
            style={{marginLeft:15}}
            size={35}
            onPress={() => {
              navigation.navigate("Drawer");
            }}
          />
           {authStore.user?._id === course.owner._id && (
     
          <Icon2
            color={"white"}
            style={{marginRight:15}}
            name="delete"
            size={30}
            onPress={handleRemove}
          />
     
        )}
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
        <View style={styles.card}>
          <Text style={styles.subTitle}>Available Seats</Text>
          <Text style={styles.txt}>{course.maxSeats}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.subTitle}>Location</Text>
          <Text style={styles.txt}>{course.location}</Text>
        </View>
       
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
    fontSize: 40,
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
   marginLeft: windowWidth/3.5,
   position:"absolute",
 
  },
  btn: {
    height: 50,
    width: "100%",
    backgroundColor: COLORS.blue,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
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
