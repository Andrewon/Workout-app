import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("UserDatabase.db");

const finishSession = (currentSessionID, selectedRoutine) => {
  db.transaction(function (txn) {
    txn.executeSql(
      "UPDATE session_table SET session_status=? WHERE routine_id=? AND session_status=?",
      [currentSessionID, selectedRoutine, 0],
      (tx, results) => {
        console.log("Finished session", results);
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
};

export default finishSession;
