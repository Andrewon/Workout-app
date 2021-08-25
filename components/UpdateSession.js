import React, { useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";
import * as SQLite from "expo-sqlite";
import getCurrentSession from "./getCurrentSession";

import { Icon, Button } from "react-native-elements";

var db = SQLite.openDatabase("UserDatabase.db");

const UpdateSession = ({
  exercise_name,
  exercise_id,
  routine_id,
  totalSet,
  currentDate,
  switchColor,
}) => {
  let [rep, setRep] = useState("");
  let [weight, setWeight] = useState("");
  let [remainingSet, setRemainingSet] = useState("");
  var currentSessionID = getCurrentSession(routine_id);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT exercise_id,remaining_set, MAX(session_id) FROM session_table WHERE session_status=? AND exercise_id=?",
        [0, exercise_id],
        (tx, results) => {
          if (results.rows.item(0).exercise_id != null) {
            console.log(results);
            setRemainingSet(results.rows.item(0).remaining_set);
            if (results.rows.item(0).remaining_set == 0) {
              switchColor(false);
            } else {
              switchColor(true);
            }
          } else {
            console.log("can't find session", results);
            setRemainingSet(totalSet);
            switchColor(true);
          }
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  }, []);

  const updateExercise = (currentSet) => {
    db.transaction(function (txn) {
      txn.executeSql(
        "INSERT INTO session_table(session_date,exercise_name,eset,rep,weight,remaining_set,routine_id,exercise_id) VALUES (?,?,?,?,?,?,?,?)",
        [
          currentDate,
          exercise_name,
          currentSet,
          rep,
          weight,
          remainingSet - 1,
          routine_id,
          exercise_id,
        ],
        (tx, results) => {
          console.log("Updated session");
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  };

  const getResult = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM session_table WHERE session_id=?",
        [currentSessionID + 1],
        (tx, results) => {
          console.log("Session_table data: ", totalSet, results);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text>Set remaining: {remainingSet}</Text>
        <TextInput
          placeholder={"Enter rep"}
          keyboardType={"number-pad"}
          style={{ flex: 1 }}
          value={rep}
          onChangeText={(rep) => {
            setRep(rep);
          }}
        />
        <TextInput
          placeholder={"Enter weight"}
          keyboardType={"number-pad"}
          style={{ flex: 1 }}
          value={weight}
          onChangeText={(weight) => {
            setWeight(weight);
          }}
        />
      </View>
      <View style={{ justifyContent: "center" }}>
        <Button
          title="Log"
          type="outline"
          onPress={() => {
            if (remainingSet != 0) {
              if (!rep) {
                alert("Please enter rep");
                return;
              }
              if (!weight) {
                alert("Please enter weight");
                return;
              }

              updateExercise(totalSet - (remainingSet - 1));
              setRemainingSet(remainingSet - 1);
              getResult();
              if (remainingSet == 1) {
                switchColor(false);
              }
            }
          }}
        />
      </View>
    </View>
  );
};

export default UpdateSession;
