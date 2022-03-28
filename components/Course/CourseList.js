import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "native-base";
import data from "../../data";
import CourseItem from "./CourseItem";
import courseStore from "../../stores/courseStore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CourseList = ({ navigation }) => {
  const [query, setQuery] = useState("");

  const courseArr = courseStore.course
    .filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    )
    .map((course) => (
      <CourseItem course={course} key={course._id} navigation={navigation} />
    ));
  return (
    <>
      <View style={styles.searchBar}>
        <Input
          w={350}
          h={39}
          borderColor="#6867AC"
          borderRadius={30}
          placeholder="Search..."
          onChangeText={(event) => setQuery(event)}
          InputLeftElement={
            <View style={styles.searchIcon}>
              <Icon name="search" marginLeft={1} size={23} alignSelf="center" />
            </View>
          }
        />
      </View>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            color={"white"}
            name="reorder-three"
            size={30}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          <Image
            style={styles.topImg}
            source={require("../../assets/Lesson.png")}
          />
        </View>
      </View>

      <ScrollView style={styles.scroll}>{courseArr}</ScrollView>
    </>
  );
};

export default CourseList;

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
  topImg: {
    width: 200,
    height: 200,
    position: "absolute",
    marginLeft: windowWidth / 5,
  },
  bg: {},
  searchBar: {
    position: "absolute",
    marginTop: windowHeight / 4,
    zIndex: 20,
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: "#F2F2F2",
  },

  searchIcon: {
    borderRadius: 30,
    width: 35,
    height: 35,
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: { backgroundColor: "#FFFAFC" },
});
