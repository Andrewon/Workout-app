import { db } from "./DatabaseH";

const finishSession = (selectedRoutine) => {
  db.transaction(function (txn) {
    txn.executeSql(
      "UPDATE session_table SET session_status=? WHERE routine_id=? AND session_status=?",
      [1, selectedRoutine, 0],
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
