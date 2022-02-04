import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import Task from "./src/components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonColors } from "./src/utils/Colors";
import AppLoading from "expo-app-loading";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  const [task, setTask] = useState({ title: "", state: false });
  const [taskItems, setTaskItems] = useState([]);
  const [inputIsEmpty, setInputIsEmpty] = useState(true);

  /*Check if the font is correctly loaded*/
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  /*Store data to local storage*/
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("allTasks", JSON.stringify(taskItems));
    } catch (e) {
      console.log(e);
    }
  };

  /*Read data from local storage*/
  const getData = async () => {
    try {
      const tasksHistory = await AsyncStorage.getItem("allTasks");
      if (tasksHistory && JSON.parse(tasksHistory).length) {
        setTaskItems(JSON.parse(tasksHistory));
      }
    } catch (e) {
      console.log(e);
    }
  };

  /*Load data from the local storage noly on the first render*/
  useEffect(() => {
    getData();
  }, []);

  /*Store data to local storeage every time the taskItems list is changer (new render)*/
  useEffect(() => {
    storeData();
  }, [taskItems]);

  /*Add the task to the list*/
  const handleAddTask = () => {
    console.log(taskItems);
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask({ title: "", state: false });
    setInputIsEmpty(true);
    console.log(taskItems);
  };

  /*Remove the clicked task*/
  const completeTask = (index, taskIsDone) => {
    let itemsCopy;
    !taskIsDone
      ? Alert.alert(
          "Warnning",
          "The task is not yet complete !\nAre you sure you want the delete it ?",
          [
            { text: "No" },
            {
              text: "Yes",
              onPress: () => {
                itemsCopy = [...taskItems];
                itemsCopy[index] = null;
                setTaskItems(itemsCopy);
                console.log(taskItems);
              },
            },
          ],
          { cancelable: false }
        )
      : ((itemsCopy = [...taskItems]),
        (itemsCopy[index] = null),
        // itemsCopy.splice(index, 1),
        setTaskItems(itemsCopy),
        console.log(taskItems));
  };

  const taskStateChange = (index, title, state) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = { title: title, state: !state };
    setTaskItems(itemsCopy);
    console.log("\nTask State Changed\n");
    console.log(taskItems);
  };

  /*Function that will be executed every time the input text is changed*/
  const handleInputTextChanged = (text) => {
    setTask({ title: text, state: false });
    !text.length ? setInputIsEmpty(true) : setInputIsEmpty(false);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          /*The style of every item in the scroll view*/
          contentContainerStyle={{
            flexGrow: 1,
          }}
          /*Dismiss the keyboard when the click is not taken by a child*/
          keyboardShouldPersistTaps="handled"
        >
          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Today's tasks</Text>
            <View style={styles.items}>
              {/* This is where the tasks will go! */}
              {taskItems.length ? (
                /*The item is the task's text and the index is a unique position given to the item*/
                taskItems.map((item, index) => {
                  if (item === null) return;
                  return (
                    /*Key is just a unique value that sould be given to avoid the warnning*/
                    /*Every child in the list should have a unique key*/
                    <View key={index}>
                      <Task
                        text={item.title}
                        state={item.state}
                        /*The "taskIsDone" var recieved from the child by the "onPress" function implicitly and it's given to 
                        "completeTask" function as an argument*/
                        onPress={(childState) =>
                          completeTask(index, childState)
                        }
                        onStateChange={() =>
                          taskStateChange(index, item.title, item.state)
                        }
                      />
                    </View>
                  );
                })
              ) : (
                <Text>No task found</Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Write a task */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            /*The value that will be given to the text*/
            value={task.title}
            /*Execute the methode when ever the text is changed*/
            onChangeText={(text) => handleInputTextChanged(text)}
          />
          <TouchableOpacity
            onPress={() => handleAddTask()}
            /*Disable or enable the button according to textInput's state*/
            disabled={inputIsEmpty ? true : false}
          >
            <View
              style={[styles.addWrapper, { opacity: inputIsEmpty ? 0.3 : 1 }]}
            >
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008a8a",
  },
  tasksWrapper: {
    paddingTop: "15%",
    paddingHorizontal: windowWidth / 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontFamily: "Inter_900Black",
    color: commonColors.White,
    textAlign: "center",
    marginBottom: "10%",
  },
  items: {
    marginTop: 0,
  },
  writeTaskWrapper: {
    bottom: windowHeight / 25,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    height: windowWidth / 7,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderColor: "#000000",
    borderWidth: 1,
    width: windowWidth / 1.4,
  },
  addWrapper: {
    flex: 0,
    width: windowWidth / 7,
    height: windowWidth / 7,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: commonColors.bla,
    borderWidth: 1,
  },
  addText: {
    fontWeight: "bold",
  },
});
