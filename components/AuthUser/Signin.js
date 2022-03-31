import React, { useState, useEffect } from "react";

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
import Icon from "react-native-vector-icons/Ionicons";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinschema } from "./userValidation";
import TouchID from "react-native-touch-id";
import * as LocalAuthentication from "expo-local-authentication";

const Signin = ({ navigation }) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinschema),
  });
  const onSubmit = (data) => authStore.Signin(data, navigation, toast);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const fallBacktoDefultAuth = () => {
    console.log("fall back to password Auth");
  };

  const alertComponent = (title, mess, btnText, btnFunc) => {
    return Alert.alert(title, mess, [{ text: btnText, onPress: btnFunc }]);
  };

  const hundleBiometricAuth = async () => {
    const isBiometricAvailble = await LocalAuthentication.hasHardwareAsync();
    if (!isBiometricAvailble) {
      return alertComponent(
        "please enter your password",
        "biometric Auth is not password",
        "ok",
        () => fallBacktoDefultAuth()
      );
    }

    let supportedBiometric;
    if (isBiometricAvailble) {
      supportedBiometric =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      const savedBiometric = await LocalAuthentication.isEnrolledAsync();

      if (!savedBiometric) {
        return alertComponent(
          "please enter your password",
          "biometric Auth is not password",
          "ok",
          () => fallBacktoDefultAuth()
        );
      }
    }

    const bimetricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login within Biometric",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });
    if (bimetricAuth) {
      onSubmit;
    }
    // if (authStore.user);
  };
  const handleNavigation = () => {
    navigation.navigate("Signup");
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Center w="100%">
      <View style={styles.container}>
        <Heading>Sign In</Heading>

        <VStack space={3} mt="5">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl>
                <FormControl.Label>Staff ID</FormControl.Label>
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  marginBottom={5}
                />
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
                  marginBottom={10}
                  type={showPassword ? "text" : "password"}
                  InputRightElement={
                    <Icon
                      size={25}
                      style={{ marginRight: 10 }}
                      name={showPassword ? "eye" : "eye-off"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              </FormControl>
            )}
            name="password"
          />
          {errors.password && <Text>{errors.password.message}</Text>}

          <View style={styles.rowbtns}>
            <Button style={styles.signbtn} onPress={handleSubmit(onSubmit)}>
              Sign in
            </Button>

            <Icon
              name="finger-print"
              color={"white"}
              size={40}
              style={styles.scanbtn}
              onPress={hundleBiometricAuth}
            />
          </View>
          <View style={styles.signUp}>
            <Text style={styles.text} onPress={handleNavigation}>
              Sign Up Now!
            </Text>
          </View>
          <HStack mt="6" justifyContent="center"></HStack>
        </VStack>
      </View>
    </Center>
  );
};
export default observer(Signin);

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
  rowbtns: { flexDirection: "row" },
  signbtn: {
    height: 50,
    width: "75%",
    backgroundColor: COLORS.blue,
    marginTop: 20,
    marginRight: 2,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  scanbtn: {
    height: 50,
    width: "20%",
    backgroundColor: COLORS.blue,
    marginTop: 20,
    paddingTop: 3,
    paddingLeft: 8,
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
  signUp: {
    alignSelf: "center",
    marginTop: 20,
    height: 50,
  },
  text: {
    color: COLORS.blue,
  },
});
