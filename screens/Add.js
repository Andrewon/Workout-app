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

var db = SQLite.openDatabase("UserDatabase.db");

const Add = ({ navigation }) => {
  var [RoutineName, setRoutineName] = useState("");
  let [routineID, setRoutineID] = useState("");

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
            // get routine_id from insertID result to pass to AddExercise.js
            setRoutineID(results.insertId);

            Alert.alert(
              "Success",
              "Routine Added Successfully" + routineID,

              [
                {
                  text: "Ok",
                  onPress: () =>
                    navigation.navigate("Add Exercise", {
                      routineID: results.insertId,
                    }),
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
      </View>
    </SafeAreaView>
  );
};

export default Add;
