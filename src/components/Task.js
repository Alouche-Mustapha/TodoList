import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { commonColors } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
/*
{...props} : means that we are giving you an object "{}" that has as propreties all the attributs that are recieved from the parent 
props : means that we are giving you an object "props" that is a copy from an object recieved from the parent
*/
const Task = ({ ...props }) => {
  const [isDone, setIsDone] = useState(props.state);

  const checkDoneClicked = () => {
    setIsDone(!isDone);
    props.onStateChange();
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <>
          {isDone ? (
            <Ionicons
              name="md-checkmark-done-sharp"
              size={windowHeight / 28}
              color={commonColors.Green}
              onPress={() => checkDoneClicked()}
            />
          ) : (
            <MaterialIcons
              name="remove-done"
              size={windowHeight / 28}
              color={commonColors.Red}
              onPress={() => checkDoneClicked()}
            />
          )}
        </>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <MaterialIcons.Button
        name="delete-forever"
        size={windowWidth / 18}
        color={commonColors.White}
        backgroundColor={commonColors.Teal}
        borderRadius={10}
        iconStyle={{ marginRight: 0 }}
        onPress={() => props.onPress(isDone)}
      >
        <Text style={{ color: "white" }}>Delete</Text>
      </MaterialIcons.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: commonColors.Silver,
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    borderRadius: 10,
    borderColor: commonColors.Black,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
  itemLeft: {
    flexDirection: "row",
    flex: 0.95,
    alignItems: "center",
  },
  itemText: {
    flex: 1,
    marginLeft: "6%",
    fontWeight: "bold",
  },
});

export default Task;
