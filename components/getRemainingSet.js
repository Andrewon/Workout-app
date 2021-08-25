import * as SQLite from "expo-sqlite";
import { useState } from "react";

var db = SQLite.openDatabase("UserDatabase.db");

const getRemainingSet = (exercise_id) => {
  var [remainingSet, setRemainingSet] = useState("");

  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT exercise_id,remaining_set, MAX(session_id) FROM session_table WHERE session_status=? AND exercise_id=?",
      [0, exercise_id],
      (tx, results) => {
        if (results.rows.item(0).exercise_id != null) {
          console.log(results);
          setRemainingSet(results.rows.item(0).remaining_set);
        } else {
          console.log("can't find session", results);
        }
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });

  return remainingSet;
};
export default getRemainingSet;
