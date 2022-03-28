import React, { useRef, useEffect } from "react";
import { Button } from "react-native-paper";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
} from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.bgHome}>
      <View style={styles.inHome}>
        <Text style={styles.mainTitle}> Training Courses</Text>
        <Image
          width={200}
          style={styles.logo}
          source={require("../../assets/GBK_logo.png")}
        />
        <Image
          style={styles.homeImage}
          source={require("../../assets/home.gif")}
        />

        <Button
          onPress={() => navigation.replace("Drawer")}
          style={styles.homebtn}
        >
          <Text style={styles.btnText}> Start Learning </Text>
        </Button>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  bgHome: {
    width: "100%",
    height: "100%",
    backgroundColor: "#edeff2",
  },

  inHome: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  homebtn: {
    width: "75%",
    height: 50,
    backgroundColor: "#B92F1A",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  mainTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#4f5156",
    marginBottom: 20,
  },
  logo: {
    marginTop: 30,
  },
  homeImage: {
    width: 300,
    height: 300,
  },
});
