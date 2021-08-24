import * as SQLite from "expo-sqlite";
import { useState } from "react";

var db = SQLite.openDatabase("UserDatabase.db");
//not using this yet. when use delete this line
const getRemainingSet = (sessionID) => {
  //   var [remainingSet, setRemainingSet] = useState([]);
  db.transaction((txn) => {
    txn.executeSql(
      "SELECT exercise_id, remaining_set FROM session_table WHERE session_status=? GROUP BY exercise_id",
      [0],
      (tx, results) => {
        console.log("remaining set: ", results);
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
};
export default getRemainingSet;
