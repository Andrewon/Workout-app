import React, { useState } from "react";
import { db } from "./DatabaseH";
import { Alert } from "react-native";
import updateExercisesCount from "./updateExerciseCount";

const DeleteStuff = ({ navigation, deleteInfo, deleteWhat }) => {
  var queryBuilder = "";

  if (deleteWhat == "routine") {
    queryBuilder = "DELETE FROM  routine_table where routine_id=?";
  } else if (deleteWhat == "exercise") {
    queryBuilder = "DELETE FROM  exercise_table where exercise_id=?";
  }

  db.transaction((tx) => {
    tx.executeSql(queryBuilder, [deleteInfo], (tx, results) => {
      console.log("Results", results.rowsAffected);
      if (results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          (deleteWhat == "routine" ? "Routine " : "Exercise ") +
            "deleted successfully",
          [
            {
              text: "Ok",
              // onPress: () => navigation.navigate("HomeScreen"),
            },
          ],
          { cancelable: false }
        );
      } else {
        alert("Invalid id");
      }
    });
  });
};

export default DeleteStuff;
