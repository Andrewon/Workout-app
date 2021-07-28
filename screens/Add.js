import React, { useState } from "react";
import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import { SIZES } from "../constants";

const Add = () => {
  let [exerciseName, setExerciseName] = useState("");
  let [set, setSet] = useState("");
  let [rep, setRep] = useState("");

  let add_user = () => {
    alert("submited " + exerciseName);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Add screen</Text>
        <TextInput
          style={SIZES.input}
          onChangeText={setExerciseName}
          value={exerciseName}
          placeholder={"Enter Name"}
        ></TextInput>
        <TextInput
          style={SIZES.input}
          onChangeText={setSet}
          value={set}
          placeholder={"Number of Set"}
          keyboardType={"numeric"}
        ></TextInput>
        <TextInput
          style={SIZES.input}
          onChangeText={setRep}
          value={rep}
          placeholder={"Number of Rep"}
          keyboardType={"numeric"}
        ></TextInput>

        <Button title={"Submit"} onPress={add_user} />
      </View>
    </SafeAreaView>
  );
};

export default Add;
