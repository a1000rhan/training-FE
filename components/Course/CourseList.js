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
import CourseItem from "./CourseItem";
import courseStore from "../../stores/courseStore";
import authStore from "../../stores/AuthStore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { observer } from "mobx-react";
import Loading from "../Loading";

const CourseList = ({ navigation }) => {
  // if (authStore.loading) return <Loading />;

  const [query, setQuery] = useState("");

  const courseArr = courseStore.courses
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
            style={styles.ico1}
            name="reorder-three"
            size={30}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          {authStore.user?.type == "admin" && (
            <Icon
              color={"white"}
              name="add-circle"
              style={styles.ico2}
              size={30}
              onPress={() => {
                navigation.navigate("AddCourse");
              }}
            />
          )}
          <Image
            style={styles.topImg}
            source={require("../../assets/Lesson.png")}
          />
        </View>
      </View>
      <>
        <ScrollView style={styles.scroll}>{courseArr}</ScrollView>
      </>
    </>
  );
};

export default observer(CourseList);

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
  ico2: {
    marginRight: 15,
  },
  topImg: {
    width: 200,
    height: 200,
    position: "absolute",
    marginLeft: windowWidth / 5,
  },
  bg: {
    width: "100%",
    height: "100%",
  },
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
  scroll: {
    marginTop: 20,
  },
});
