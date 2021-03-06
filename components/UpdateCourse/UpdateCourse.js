import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  PlatformColor,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import courseStore from "../../stores/courseStore";
import Loading from "../Loading";

const UpdateCourse = ({ navigation, route }) => {
  if (courseStore.loading) {
    <Loading />;
  }
  const UpCourse = route.params.course;
  console.log(
    "🚀 ~ file: UpdateCourse.js ~ line 23 ~ UpdateCourse ~ UpCourse",
    UpCourse
  );

  const [course, setCourse] = useState({
    _id: UpCourse._id,
    title: UpCourse.title,
    time: UpCourse.time,
    description: UpCourse.description,
    date: UpCourse.date,
    location: UpCourse.location,
    maxSeats: UpCourse.maxSeats,
    image: UpCourse.image,
    skills: UpCourse.skills,
  });

  const [isDateShow, setIsDateShow] = useState(true);
  const [isTimeShow, setIsTimeShow] = useState(true);
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));

  const showDate = () => {
    setIsDateShow(true);
  };
  const showTime = () => {
    setIsTimeShow(true);
  };

  const onChangeStartDate = (event, value) => {
    setStartDate(value);
    if (Platform.OS === "android") {
      setIsDateShow(false);
    }
  };
  const onChangeEndDate = (event, value) => {
    setEndDate(value);
    if (Platform.OS === "android") {
      setIsDateShow(false);
    }
  };
  const onChangeStartTime = (event, value) => {
    setStartTime(value);
    if (Platform.OS === "android") {
      setIsDateShow(false);
    }
  };
  const onChangeEndTime = (event, value) => {
    setEndTime(value);

    if (Platform.OS === "android") {
      setIsDateShow(false);
    }
  };
  const handleSubmit = () => {
    let tempCourse = {
      ...course,
      date: `${moment(startDate).format("YYYY-MM-DD")} - ${moment(
        endDate
      ).format("YYYY-MM-DD")}`,

      time: `${moment(startTime).format("HH:mm")} - ${moment(endTime).format(
        "HH:mm"
      )}`,
    };

    setCourse(tempCourse);
    navigation.navigate("UpdateCategories", { course, tempCourse });
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
              navigation.goBack();
            }}
          />
        </View>
        <Text style={styles.Title}>Update Course</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.comp}>
          <Text style={styles.label}>Course Title</Text>
          <TextInput
            style={styles.input}
            value={course.title}
            placeholder={"Enter Course Title"}
            onChangeText={(value) => setCourse({ ...course, title: value })}
          />
        </View>
        <View style={styles.comp}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.textField}
            multiline={true}
            value={course.description}
            placeholder={"Enter Course Description"}
            onChangeText={(value) =>
              setCourse({ ...course, description: value })
            }
          />
        </View>

        <View style={styles.comp}>
          <Text style={styles.label}>Time & Date</Text>
          <Text style={styles.smlabel}>Date</Text>
          <View style={styles.date}>
            {!isDateShow && (
              <View style={styles.btnContainer}>
                <Button color="black" onPress={showDate}>
                  Choose the Date
                </Button>
              </View>
            )}
            {isDateShow && (
              <>
                <DateTimePicker
                  value={startDate}
                  dateFormat="DD-MM-YY"
                  mode={"date"}
                  display={Platform.OS === "ios" ? "" : "default"}
                  onChange={onChangeStartDate}
                  style={styles.datePicker}
                />

                <DateTimePicker
                  value={endDate}
                  mode={"date"}
                  display={Platform.OS === "ios" ? "" : "default"}
                  onChange={onChangeEndDate}
                  style={styles.datePicker}
                />
              </>
            )}
          </View>
          <Text style={styles.smlabel}>Time</Text>
          <View style={styles.date}>
            {!isTimeShow && (
              <View style={styles.btnContainer}>
                <Button color="black" onPress={showTime}>
                  choose the Time
                </Button>
              </View>
            )}
            {isTimeShow && (
              <>
                <DateTimePicker
                  value={startTime}
                  mode={"time"}
                  display={Platform.OS === "ios" ? "" : "default"}
                  onChange={onChangeStartTime}
                  style={styles.datePicker}
                />

                <DateTimePicker
                  value={endTime}
                  mode={"time"}
                  display={Platform.OS === "ios" ? "" : "default"}
                  onChange={onChangeEndTime}
                  style={styles.datePicker}
                />
              </>
            )}
          </View>
        </View>
        <View style={styles.comp}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={course.location}
            placeholder={"Enter Course Title"}
            onChangeText={(value) => setCourse({ ...course, location: value })}
          />
        </View>
        <Button style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Next</Text>
        </Button>
      </View>
    </>
  );
};

export default UpdateCourse;

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
  textField: {
    borderWidth: 1,
    borderColor: "#173E7A",
    height: 80,
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

  btnContainer: {},
  // This only works on iOS
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
  btnTxt: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },
});
