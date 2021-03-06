import { db } from "./DatabaseH";

const updateExercisesCount = (routineID) => {
  db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM exercise_table WHERE routine_id=?",
      [routineID],
      (tx, results) => {
        tx.executeSql(
          "UPDATE routine_table SET exercises_count=? WHERE routine_id=?",
          [results.rows.length, routineID]
        );
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
};
export default updateExercisesCount;
