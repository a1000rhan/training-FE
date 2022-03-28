import React, { useState } from "react";

import {StyleSheet,View} from "react-native";

import {
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  useToast,
  VStack,
  Text,
} from "native-base";

import COLORS from "../../color";

import authStore from "../../stores/AuthStore";
import { observer } from "mobx-react";



const Signup = ({ navigation }) => {
  

  const handleSubmit =  () => {
     authStore.signup(user);
    if (authStore.user) navigation.replace("CourseList");
  };
  

  return (
    <Center w="100%">
      <View style={styles.container}>
        <Heading>Create an Account</Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Staff ID</FormControl.Label>
            <Input
              onChangeText={(value) => setUser({ ...user, staffId: value })}
              
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) => setUser({ ...user, password: value })}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" onChangeText={(value) => {}} />
          </FormControl>
    
          <Button style={styles.btn} onPress={handleSubmit}>
            Sign Up
          </Button>
          <Button style={styles.btn} onPress={() => navigation.goBack()}>
            Back
          </Button>
          <HStack mt="6" justifyContent="center"></HStack>
        </VStack>
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
    alignSelf:"center",
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
    backgroundColor: COLORS.blue,
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
  tac:{
    alignSelf:"center",
    fontSize:10
  }
});