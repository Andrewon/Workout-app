import React, { useState } from "react";
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

var db = SQLite.openDatabase("UserDatabase.db");

const DeleteStuff = ({ navigation, deleteInfo }) => {
  // let [inputUserId, setInputUserId] = useState("");

  // let deleteUser = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM  routine_table where routine_id=?",
      [deleteInfo],
      (tx, results) => {
        console.log("Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            "Success",
            "Routine deleted successfully",
            [
              {
                text: "Ok",
                // onPress: () => navigation.navigate("HomeScreen"),
              },
            ],
            { cancelable: false }
          );
        } else {
          alert("Please insert a valid Routine Id");
        }
      }
    );
  });
};

export default DeleteStuff;
