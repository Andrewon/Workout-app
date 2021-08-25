import * as SQLite from "expo-sqlite";
import { useState } from "react";

var db = SQLite.openDatabase("UserDatabase.db");

const displaySessionData = (routineID) => {
  let [flatListItems, setFlatListItems] = useState([]);
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT * FROM session_table WHERE routine_id=?",
      [routineID],
      (tx, results) => {
        var temp = [];

        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }

        setFlatListItems(temp);
      }
    );
  });

  return flatListItems;
};

export default displaySessionData;
