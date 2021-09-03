import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { db } from "../components/DatabaseH";
import { Button, Icon } from "react-native-elements";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

import { COLORS, SIZES } from "../constants";
import updateExercisesCount from "../components/updateExerciseCount";

const AddExercise = ({ navigation, route }) => {
  let { routineID } = route.params;

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
    _inputs[key][name] = text;

    setInputs(_inputs);
    console.log(_inputs[0]["exerName"]);
  };

  //add exercises from inputList into SQLite
  let add_exercise = () => {
    for (let i = 0; i < inputList.length; i++) {
      if (!inputList[i]["exerName"]) {
        alert("Please enter exercise name");
        return;
      }

      if (!inputList[i]["exerRep"]) {
        alert("Please enter number of rep");
        return;
      }

      if (!inputList[i]["exerSet"]) {
        alert("Please enter number of set");
        return;
      }
    }

    db.transaction(function (tx) {
      for (let i = 0; i < inputList.length; i++) {
        console.log("inside query", inputList[i]["exerName"]);
        tx.executeSql(
          "INSERT INTO exercise_table(exercise_name,eset,rep,routine_id) VALUES (?,?,?,?)",
          [
            inputList[i]["exerName"],
            Number(inputList[i]["exerSet"]),
            Number(inputList[i]["exerRep"]),
            routineID,
          ],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
            } else
              Alert.alert(
                "Error",
                "Adding Exercise Failed",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("Home"),
                  },
                ],
                { cancelable: false }
              );
          }
        );
      }
    });
    Alert.alert(
      "Done",
      "Exercise(s) added",
      [
        {
          text: "Ok",
          onPress: () => navigation.navigate("Home"),
        },
      ],
      { cancelable: false }
    );

    updateExercisesCount(routineID);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.container}>
        <Button
          icon={
            <Icon
              name="arrow-back-ios"
              size={20}
              color="gray"
              type="materialicons"
            />
          }
          type="clear"
          onPress={() => navigation.goBack()}
        />
        <Text>Add Exercise</Text>

        <Button
          icon={
            <Icon name="done-all" size={20} color="gray" type="materialicons" />
          }
          type="clear"
          onPress={() => {
            add_exercise();
          }}
        />
      </View>

      <View style={{ height: screenHeight - 100 }}>
        <ScrollView>
          {inputList.map((input, index) => (
            <View key={index} style={styles.inputContainer}>
              <TextInput
                placeholder={"Enter Name"}
                value={input.exerName}
                editable={true}
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

              <Button
                style={{
                  alignSelf: "flex-end",
                }}
                icon={
                  <Icon
                    name="delete-forever"
                    size={17}
                    color="gray"
                    type="materialicons"
                  />
                }
                type="clear"
                onPress={() => {
                  deleteHandler(index);
                }}
              />
            </View>
          ))}
        </ScrollView>
        <Button
          style={{ alignItems: "flex-end", marginRight: 20 }}
          icon={
            <Icon
              name="playlist-add"
              size={25}
              color="black"
              type="materialicons"
            />
          }
          type="clear"
          onPress={() => {
            addHandler();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray2,
    marginHorizontal: SIZES.padding,
  },
});

export default AddExercise;
