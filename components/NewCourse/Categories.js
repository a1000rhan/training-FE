import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Chip } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import Icon from "react-native-vector-icons/Ionicons";
import courseStore from "../../stores/courseStore";

const Categories = ({ route, navigation }) => {
  const inComing = route.params.tempCourse;
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

  const handelChangeSkill = (event) => {
    setSkills(event);
  };
  const addNewSkill = () => {
    skills && setNewSkills([...newSkills, skills]);
    setSkills("");
  };
  const SkillsList = newSkills.map((skill, index) => (
    <Chip key={index} style={styles.chip}>
      <Text style={styles.chipText}>{skill}</Text>
    </Chip>
  ));
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
              navigation.navigate("AddCourse");
            }}
          />
        </View>
        <Text style={styles.title}>Add New Course</Text>
      </View>
      <View style={styles.container}>
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
            <Icon.Button
              onPress={() => addNewSkill}
              backgroundColor={"#173E7A"}
              size={20}
              name="add"
            />
          </View>
          <View style={styles.checkboxContainer}>{SkillsList}</View>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={_pickImage}>
          <Text style={styles.photoTxtBtn}>Choose a Photo</Text>
        </TouchableOpacity>
        <Button style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Add Course</Text>
        </Button>
      </View>
    </>
  );
};

export default Categories;

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
    alignSelf: "center",
    margin: 20,
    backgroundColor: "#B92F1A",
    color: "white",
    width: "60%",
    height: 50,

    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    paddingTop: 3,
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
    marginTop: 10,
    backgroundColor: "#173E7A",
    borderRadius: 5,
  },
  btnTxt: {
    color: "white",
  },
  chip: {
    backgroundColor: "#B92F1A",
    marginBottom: 5,
    marginRight: 5,
  },
  chipText: { color: "white", fontWeight: "bold" },
  plus: { marginTop: 4, width: 40, alignSelf: "flex-end" },
});
