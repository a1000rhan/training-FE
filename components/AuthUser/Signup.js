import React, { useState } from "react";

import { StyleSheet, TextInput, View } from "react-native";

import {
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  VStack,
  useToast,
  Text,
} from "native-base";

import COLORS from "../../color";

import authStore from "../../stores/AuthStore";
import { observer } from "mobx-react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./userValidation";
import Signin from "./Signin";

const Signup = ({ navigation }) => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => authStore.Signup(data, navigation, toast);
  if (authStore.user);

  return (
    <Center w="100%">
      <View style={styles.container}>
        <Heading>Create an Account</Heading>

        <VStack space={3} mt="5">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl>
                <FormControl.Label>Staff ID</FormControl.Label>
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              </FormControl>
            )}
            name="staffId"
          />
          {errors.staffId && <Text>{errors.staffId.message}</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="password"
                />
              </FormControl>
            )}
            name="password"
          />
          {errors.password && <Text>{errors.password.message}</Text>}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl>
                <FormControl.Label>confirmPassword</FormControl.Label>
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="password"
                />
              </FormControl>
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text style={{ color: "red" }}>
              {errors.confirmPassword.message}ss
            </Text>
          )}

          <Button style={styles.btn} onPress={handleSubmit(onSubmit)}>
            Sign Up
          </Button>
          {/* <Button
            style={styles.btn}
            onPress={() => navigation.navigate("Signin")}
          >
            Already have an Account
          </Button> */}
          <HStack mt="6" justifyContent="center"></HStack>
        </VStack>
      </View>
    </Center>
  );
};
export default observer(Signup);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "80%",
    height: "80%",
    display: "flex",
    marginTop: 60,
    justifyContent: "center",
    alignSelf: "center",
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
  tac: {
    alignSelf: "center",
    fontSize: 10,
  },
});
