import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as SQLite from "expo-sqlite";

import { COLORS } from "../constants";

var db = SQLite.openDatabase("UserDatabase.db");

const Recipe = () => {
  const [inputList, setInputs] = useState([
    { exerSet: "", exerRep: "", exerName: "" },
  ]);

  const addHandler = () => {
    const _inputs = [...inputList];
    _inputs.push({ exerSet: "", exerRep: "", exerName: "" });
    setInputs(_inputs);
  };

  const deleteHandler = (key) => {
    const _inputs = inputList.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const inputHandler = (text, key, name) => {
    const _inputs = [...inputList];
    console.log(text, "key:  " + key, "name: " + name);
    // name is a 2d array column consist of inputList  [name,name,name...]
    _inputs[key][name] = text;

    setInputs(_inputs);
    console.log(_inputs[0]["exerName"]);
  };
  //add exercises from inputList into a SQLite
  let add_exercise = () => {
    db.transaction(function (tx) {
      for (let i = 0; i < inputList.length; i++) {
        console.log("inside query", inputList[i]["exerName"]);
        tx.executeSql(
          "INSERT INTO exercise_table(exercise_name,eset,rep,routine_id) VALUES (?,?,?,?)",
          [
            inputList[i]["exerName"],
            Number(inputList[i]["exerSet"]),
            Number(inputList[i]["exerRep"]),
            1,
          ],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
          }
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.inputsContainer}>
        {inputList.map((input, index) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={"Enter Name"}
              value={input.exerName}
              onChangeText={(text) => inputHandler(text, index, "exerName")}
            />
            <TextInput
              placeholder={"Enter Set"}
              value={input.exerSep}
              keyboardType={"number-pad"}
              onChangeText={(text) => inputHandler(text, index, "exerSet")}
            />
            <TextInput
              placeholder={"Enter Rep"}
              value={input.exerRep}
              keyboardType={"number-pad"}
              onChangeText={(text) => inputHandler(text, index, "exerRep")}
            />
            <TouchableOpacity onPress={() => deleteHandler(index)}>
              <Text style={{ color: "red", fontSize: 13 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Button title="Add" onPress={addHandler} />
      <Button title="Submit" onPress={add_exercise} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    padding: 10,
    backgroundColor: COLORS.gray2,
  },
});

export default Recipe;
