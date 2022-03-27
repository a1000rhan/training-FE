import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CourseList = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(event) => setQuery(event)}
          left={<TextInput.Icon name="search" />}
        />
      </View>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            color={"white"}
            name="reorder-three"
            size={30}
            onPress={() => {}}
          />
        </View>
      </View>

      <ScrollView style={styles.scroll}></ScrollView>
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
    position: "absolute",
    marginTop: 30,
    marginLeft: windowWidth / 5,
  },
  bg: {},
  searchBar: {
    position: "absolute",
    marginTop: windowHeight / 8,
    zIndex: 20,
    width: "95%",
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: "#F2F2F2",
  },

  searchIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: { backgroundColor: "#FFFAFC" },
});
