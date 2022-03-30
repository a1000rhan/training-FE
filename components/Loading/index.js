import { StyleSheet, View } from "react-native";
import React from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color="#173E7A" size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
