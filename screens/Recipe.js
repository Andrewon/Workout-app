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
  const [inputs, setInputs] = useState([
    { exerSet: "", exerRep: "", exerName: "" },
  ]);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ exerSet: "", exerRep: "", exerName: "" });
    setInputs(_inputs);
  };

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const inputHandler = (text, key, name) => {
    const _inputs = [...inputs];
    console.log(text, "key:  " + key, "name: " + name);
    // name is a 2d array column consist of inputs  [name,name,name...]
    _inputs[key][name] = text;

    setInputs(_inputs);
    console.log(JSON.stringify(_inputs));
  };

  let add_exercise = () => {
    db.transaction(function (tx) {
      for (let i = 0; i < inputList.length - 1; i++) {
        tx.executeSql(
          "INSERT INTO exercise_table (routine_name,eset,rep,routine_id) VALUES (?,?,?,?)",
          [
            inputs[i][exerName],
            inputs[i][exerSet],
            inputs[i][exerRep],
            inputs[i][exerRoutineID],
          ]
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.inputsContainer}>
        {inputs.map((input, key) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={"Enter Name"}
              value={input.exerName}
              onChangeText={(text) => inputHandler(text, key, "exerName")}
            />
            <TextInput
              placeholder={"Enter Set"}
              value={input.exerSep}
              keyboardType={"number-pad"}
              onChangeText={(text) => inputHandler(text, key, "exerSet")}
            />
            <TextInput
              placeholder={"Enter Rep"}
              value={input.exerRep}
              keyboardType={"number-pad"}
              onChangeText={(text) => inputHandler(text, key, "exerRep")}
            />
            <TouchableOpacity onPress={() => deleteHandler(key)}>
              <Text style={{ color: "red", fontSize: 13 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Button title="Add" onPress={addHandler} />
      <Button title="Submit" onPress={addHandler} />
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
