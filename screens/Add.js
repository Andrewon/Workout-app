import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";
import { SIZES } from "../constants";
import * as SQLite from "expo-sqlite";
import AddExercise from "./AddExercise";
import TestDisplay from "./ExerciseDisplay";

var db = SQLite.openDatabase("UserDatabase.db");

const Add = ({ navigation }) => {
  let [RoutineName, setRoutineName] = useState("");

  let add_user = () => {
    console.log(RoutineName);

    if (!RoutineName) {
      alert("Please enter Routine Name");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO routine_table (routine_name) VALUES (?)",
        [RoutineName],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Routine Added Successfully",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Home"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Creating Routine Failed");
        }
      );
    });
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={SIZES.input}
          onChangeText={setRoutineName}
          value={RoutineName}
          placeholder={"Enter Routine Name"}
        ></TextInput>

        <Button title={"Submit"} onPress={add_user} />
        <TestDisplay></TestDisplay>
      </View>
    </SafeAreaView>
  );
};

export default Add;
