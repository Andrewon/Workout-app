import { db } from "./DatabaseH";
import { useState } from "react";

const displaySessionData = (routineID) => {
  return new Promise((resolve, reject) => {
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
    resolve(flatListItems);
  });
};

export default displaySessionData;
