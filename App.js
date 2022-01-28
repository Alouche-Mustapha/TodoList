import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

import { commonColors } from "./src/utils/Colors";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Today's tasks</Text>
      </View>
      <View>

      </View>
      <View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonColors.Gray,
    justifyContent: "flex-start",
  },
  titleContainer: {
    flex: 0,
    height: "15%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    backgroundColor: commonColors.Green,
  },
});
