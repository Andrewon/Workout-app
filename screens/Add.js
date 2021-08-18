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
import { useEffect } from "react/cjs/react.production.min";

var db = SQLite.openDatabase("UserDatabase.db");

const Add = ({ navigation }) => {
  var [RoutineName, setRoutineName] = useState("");
  var routineID = "";

  let add_exercise = () => {
    navigation.navigate("Add Exercise", {
      routineID,
    });
    console.log("called add_exercise");
  };

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
            routineID = results.insertId;
            console.log(routineID);
            add_exercise();
            // Alert.alert(
            //   "Success",
            //   "Routine Added Successfully",

            //   [
            //     {
            //       text: "Ok",
            //       onPress: () =>
            //         navigation.navigate("Add Exercise", {
            //           routineID: results.insertId,
            //         }),
            //     },
            //   ],
            //   { cancelable: false }
            // );
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
