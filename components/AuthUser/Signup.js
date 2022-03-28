import React, { useState } from "react";

import { StyleSheet, View,Center,VStack,Heading,HStack,Button} from "react-native";

import {  TextInput } from "react-native-paper";

import COLORS from "../../color";

import authStore from "../../stores/AuthStore";
import { observer } from "mobx-react";


const Signup = ({ navigation }) => {

  
  const [user, setUser] = useState({
    staffId: "",
    password: "",
    confirmPassword: "",
  
  });

  const handleSubmit =  () => {
     authStore.signup(user);
    if (authStore.user) navigation.replace("CourseList");
  };

  return (
    <Center w="100%">
      <View style={styles.container}>
        <Heading>Sign up to continue!</Heading>

        <View space={3} mt="5">
          
            <TextInput
            label="Staff ID"
            onChangeText={(value) => setUser({ ...user, staffId: value })}
            />
          

          <TextInput
            label="Password"
            onChangeText={(value) => setUser({ ...user, password: value })}
            />

           <TextInput
            label="Confirm Password"
            onChangeText={(value) => setUser({ ...user,confirmPassword: value })}
            /> 
          <Button style={styles.btn} onPress={handleSubmit}>
            Sign Up
          </Button>
          <View mt="6" justifyContent="center"></View>
        </View>
      </View>
    </Center>
  );
};
export default observer (Signup);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "80%",
    height: "95%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
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
  btn: {
    height: 50,
    width: "100%",
    backgroundColor: COLORS.main,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxContainer: { display: "flex", flexDirection: "row" },
  checkbox: {
    display: "flex",
    flexDirection: "row",
  },

  label: {
    margin: 8,
  },
});