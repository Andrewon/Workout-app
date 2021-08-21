import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("UserDatabase.db");

//route contain routine ID for searchRoutine()
const edit = ({ navigation, route }) => {
  let { selectedRoutine } = route.params; //routine_id
  let [routineName, setRoutineName] = useState("");
  // "SELECT * FROM routine_table where routine_id = ?";
  let [queryBuilder, setQueryBuilder] = useState("");
  // need "where" in route and use this in if else
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(queriesRoutineTable, [selectedRoutine], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          let res = results.rows.item(0);
          setRoutineName(res.routine_name);
        } else {
          alert("No routine found");
        }
      });
    });
  }, []);

  let updateRoutine = () => {
    if (!routineName) {
      alert("Please enter a name");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE routine_table set routine_name=? where routine_id=?",
        [routineName, selectedRoutine],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Routine updated successfully",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Home"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Updation Failed");
        }
      );
    });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{ flex: 1 }}
          value={routineName}
          onChangeText={(routineName) => {
            setRoutineName(routineName);
          }}
        />
        <Button
          title={"delete text"}
          onPress={() => {
            setRoutineName("");
          }}
        />
      </View>
      <View>
        <Button
          title={"Edit Name"}
          onPress={() => {
            updateRoutine();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default edit;
