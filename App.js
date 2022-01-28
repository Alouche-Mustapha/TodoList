import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput } from "react-native";

import { commonColors } from "./src/utils/Colors";

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Today's tasks</Text>
      </View>
      <View style={styles.bodyContainer}></View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} />
        <TouchableOpacity style={styles.button}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonColors.Gray,
    justifyContent: "flex-start",
  },
  titleContainer: {
    flex: 0.2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    backgroundColor: commonColors.Green,
  },
  bodyContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: commonColors.Maroon,
  },
  textInput: {
    flex: 0.9,
    borderColor: commonColors.Black,
    borderRadius: 50,
    height: 50,
    borderWidth: 3,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: commonColors.Yellow,
    borderColor: commonColors.Black,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
