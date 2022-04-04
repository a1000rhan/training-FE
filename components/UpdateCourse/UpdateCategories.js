import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Chip } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import Icon from "react-native-vector-icons/Ionicons";
import courseStore from "../../stores/courseStore";
import { baseURL } from "../../stores/api";

const UpdateCategories = ({ route, navigation }) => {
  const inComing = route.params.tempCourse;
  console.log(
    "🚀 ~ file: UpdateCategories.js ~ line 20 ~ UpdateCategories ~ inComing",
    inComing
  );
  const [course, setCourse] = useState({
    title: inComing.title,
    description: inComing.description,
    time: inComing.time,
    date: inComing.date,
    location: inComing.location,
    maxSeats: 20,
    image: "",
    skills: [],
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  //......Image Picker............
  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const localUri = result.uri;
        const trimmedURI =
          Platform.OS === "android"
            ? result.uri
            : result.uri.replace("file://", "");

        const filename = localUri.split("/").pop();
        const match = /.(\w+)$/.exec(filename);
        const myImage = {
          uri: trimmedURI,
          name: filename,
          // type: result.type,
          // type: mime?.getType(trimmedURI),
          type: match ? `image/${match[1]}` : myImage.uri,
        };

        setUploadedImage(localUri);

        setCourse({ ...course, image: myImage });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //............Skills............
  const [skills, setSkills] = useState();
  const [newSkills, setNewSkills] = useState([]);
  // const [deleteSkill, setDeleteSkill] = useState(newSkills);

  const handelChangeSkill = (event) => {
    setSkills(event);
  };
  const addNewSkill = () => {
    setNewSkills([...newSkills, skills]);
    setSkills("");
  };
  const SkillsList = newSkills.map((skill, index) => (
    <Chip
      key={index}
      style={styles.chip}
      onPress={() => deleteCourseSkills(index)}
    >
      <Text style={styles.chipText}>{skill}</Text>
    </Chip>
  ));
  const deleteCourseSkills = (selectedSkill) => {
    setNewSkills(newSkills.filter((skill, index) => index != selectedSkill));
  };

  console.log(
    "🚀 ~ file: Categories.js ~ line 88 ~ Categories ~ newSkills",
    newSkills
  );
  //...........handle Submit............
  const handleSubmit = () => {
    let tempCourse = { ...course, skills: newSkills };

    courseStore.createCourse(tempCourse, navigation);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            color={"white"}
            name="arrow-back-circle-sharp"
            size={35}
            onPress={() => {
              navigation.navigate("UpdateCourse");
            }}
          />
        </View>
        <Text style={styles.title}>Add New Course</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.comp}>
          <Text style={styles.label}>Max Seats</Text>
          <TextInput
            style={styles.input}
            placeholder={"Enter number of Seats"}
            onChangeText={(value) => setCourse({ ...course, maxSeats: value })}
          />
        </View>

        <View style={styles.comp}>
          <Text style={styles.label}>Skills</Text>
          <TextInput
            style={styles.input}
            value={skills}
            placeholder={"Enter Course Title"}
            onChangeText={handelChangeSkill}
          />

          <View style={styles.plus}>
            <Icon
              onPress={addNewSkill}
              backgroundColor={"#173E7A"}
              size={30}
              color={"white"}
              name="add"
            />
          </View>
          <View style={styles.checkboxContainer}>{SkillsList}</View>
        </View>
        <Image
          source={{ uri: uploadedImage }}
          style={uploadedImage ? styles.uplodImg : ""}
        />
        <TouchableOpacity style={styles.addBtn} onPress={_pickImage}>
          <Icon name="image" size={30} color={"white"} />
        </TouchableOpacity>

        <Button style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Add Course</Text>
        </Button>
      </ScrollView>
    </>
  );
};

export default UpdateCategories;

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
  title: {
    fontSize: 40,
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  container: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  label: { marginTop: 5, fontSize: 15, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#173E7A",
    height: 50,
    padding: 10,
    borderRadius: 3,
  },
  comp: {
    marginTop: 10,
    marginBottom: 10,
  },
  date: { display: "flex", flexDirection: "row" },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  photoTxtBtn: {
    color: "white",
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  btnContainer: {
    padding: 30,
  },
  datePicker: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 30,
    width: 120,
  },
  btn: {
    height: 50,
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#173E7A",
  },
  addBtn: {
    alignSelf: "center",
    marginTop: 20,
    padding: 10,

    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B92F1A",
  },
  btnTxt: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },
  chip: {
    backgroundColor: "#B92F1A",
    marginBottom: 5,
    marginRight: 5,
  },
  chipText: { color: "white", fontWeight: "bold" },
  plus: {
    marginTop: 5,
    borderRadius: 20,
    alignSelf: "flex-end",
    backgroundColor: "#173E7A",
  },
  uplodImg: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#173E7A",
    alignSelf: "center",
  },
});
