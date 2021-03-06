import { observer } from "mobx-react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import authStore from "../../stores/AuthStore";
import CourseItem from "../Course/CourseItem";
import Loading from "../Loading";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserProfile = ({ navigation }) => {
  // if (authStore.user?.type === "student" && !authStore.profile) {
  //   authStore.fetchUserProfile();
  // }
  if (authStore.profileLoading) {
    return <Loading />;
  }

  const courses = authStore.profile?.courses.map((course) => (
    <CourseItem course={course} key={course._id} navigation={navigation} />
  ));
  console.log(
    "🚀 ~ file: UserProfile.js ~ line 30 ~ UserProfile ~ authStore.profile",
    authStore.profile
  );

  return (
    <>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            color={"white"}
            name="arrow-back-circle-sharp"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.user}>
          <Avatar.Image
            size={100}
            source={{
              uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
            }}
          />
          <Text style={styles.username}>
            {authStore.user ? authStore.user.staffId : "User"}
          </Text>
        </View>
      </View>
      <>
        <ScrollView>
          <View style={styles.card}>
            <Text style={styles.subTitle}>
              First Name:
              <Text style={styles.txt}> {authStore.profile?.firstName}</Text>
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.subTitle}>
              Last Name:
              <Text style={styles.txt}> {authStore.profile?.lastName}</Text>
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.subTitle}>Courses:</Text>
            <Text style={styles.txt}></Text>
            {courses}
          </View>
        </ScrollView>
      </>
    </>
  );
};

export default observer(UserProfile);

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
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 10,
  },
  username: {
    marginLeft: 20,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  bg: {
    width: "100%",
    height: windowHeight,
  },
  card: {
    width: "95%",
    padding: 15,
    flex: 1,
    borderRadius: 20,
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
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f5156",
    marginBottom: 5,
  },
  txt: {
    fontSize: 20,
    fontWeight: "normal",
  },
});
