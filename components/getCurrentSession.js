import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { Alert } from "react-native";

var db = SQLite.openDatabase("UserDatabase.db");

const getCurrentSession = (routineID) => {
  let [currentSessionID, setCurrentSessionID] = useState(0);

  db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM session_table WHERE routine_id=?",
      [routineID],
      (tx, results) => {
        if (results.rows.length != 0) {
          setCurrentSessionID(
            results.rows.item(results.rows.length - 1).session_id
          );
        } else {
        }
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
  //check the last session, if done =1 then increase session number by 1, else using the same.

  return currentSessionID;
};
export default getCurrentSession;
