import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import * as SQLite from "expo-sqlite";

import { Icon, Button } from "react-native-elements";

var db = SQLite.openDatabase("UserDatabase.db");

const UpdateSession = ({
  exercise_name,
  exercise_id,
  routine_id,
  totalSet,
  currentDate,
}) => {
  let [rep, setRep] = useState("");
  let [weight, setEset] = useState("");
  let [currentSet, setCurrentSet] = useState(totalSet);

  const updateExercise = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "INSERT INTO session_table(session_date,exercise_name,eset,rep,weight,routine_id,exercise_id) VALUES (?,?,?,?,?,?,?)",
        [
          currentDate,
          exercise_name,
          currentSet,
          rep,
          weight,
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
        "SELECT * FROM session_table",
        [],
        (tx, results) => {
          console.log("Session_table data: ", results);
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
        <Text>Set remaining: {currentSet}</Text>
        <TextInput
          placeholder={"Enter rep"}
          style={{ flex: 1 }}
          value={rep}
          onChangeText={(rep) => {
            setRep(rep);
          }}
        />
        <TextInput
          placeholder={"Enter weight"}
          style={{ flex: 1 }}
          value={weight}
          onChangeText={(weight) => {
            setEset(weight);
          }}
        />
      </View>
      <View style={{ justifyContent: "center" }}>
        <Button
          title="Log"
          type="outline"
          onPress={() => {
            if (currentSet != 0) {
              if (!rep) {
                alert("Please enter rep");
                return;
              }
              if (!weight) {
                alert("Please enter weight");
                return;
              }
              setCurrentSet(currentSet - 1);
              updateExercise();
              getResult();
            }
          }}
        />
      </View>
    </View>
  );
};

export default UpdateSession;
