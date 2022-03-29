import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddCourse = ({ navigation }) => {
  const [course, setCourse] = useState({
    title: "",
    time: "",
    description: "",
    image: "",
    location: "",
  });
  const [isPickerShow, setIsPickerShow] = useState(true);
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));

  const onChangeStartDate = (event, value) => {
    setStartDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };
  const onChangeEndDate = (event, value) => {
    setEndDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };
  const onChangeStartTime = (event, value) => {
    setStartTime(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };
  const onChangeEndTime = (event, value) => {
    setEndTime(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
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
              navigation.navigate("Drawer");
            }}
          />
        </View>
        <Text style={styles.Title}>Add New Course</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.comp}>
          <Text style={styles.label}>Course Title</Text>
          <TextInput style={styles.input} placeholder={"Enter Course Title"} />
        </View>
        <View style={styles.comp}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder={"Enter Course Description"}
          />
        </View>
        <View style={styles.comp}>
          <Text style={styles.label}>Skills</Text>
          <TextInput style={styles.input} placeholder={"Enter Course Title"} />
        </View>
        <View style={styles.comp}>
          <Text style={styles.label}>Time & Date</Text>
          <Text style={styles.smlabel}>Date</Text>
          <View style={styles.date}>
            {isPickerShow && (
              <DateTimePicker
                value={startDate}
                mode={"date"}
                display={Platform.OS === "ios" ? "" : "default"}
                is24Hour={true}
                onChange={onChangeStartDate}
                style={styles.datePicker}
              />
            )}
            {isPickerShow && (
              <DateTimePicker
                value={endDate}
                mode={"date"}
                display={Platform.OS === "ios" ? "" : "default"}
                is24Hour={true}
                onChange={onChangeEndDate}
                style={styles.datePicker}
              />
            )}
          </View>
          <Text style={styles.smlabel}>Time</Text>
          <View style={styles.date}>
            {isPickerShow && (
              <DateTimePicker
                value={startTime}
                mode={"time"}
                display={Platform.OS === "ios" ? "" : "default"}
                is24Hour={true}
                onChange={onChangeStartTime}
                style={styles.datePicker}
              />
            )}
            {isPickerShow && (
              <DateTimePicker
                value={endTime}
                mode={"time"}
                display={Platform.OS === "ios" ? "" : "default"}
                is24Hour={true}
                onChange={onChangeEndTime}
                style={styles.datePicker}
              />
            )}
          </View>
        </View>
        <View style={styles.comp}>
          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} placeholder={"Enter Course Title"} />
        </View>
        <Button style={styles.btn}>
          <Text style={styles.btnTxt}>Add Course</Text>
        </Button>
      </View>
    </>
  );
};

export default AddCourse;

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
  Title: {
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
  label: { fontSize: 15, fontWeight: "bold" },
  smlabel: { fontSize: 15, marginTop: 5 },
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

  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
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
  },
  btnTxt: {
    color: "white",
  },
});
