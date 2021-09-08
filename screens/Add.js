import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView } from "react-native";
import { COLORS, SIZES } from "../constants";
import { db } from "../components/DatabaseH";
import { Button, Icon } from "react-native-elements";

const Add = ({ navigation }) => {
  var [RoutineName, setRoutineName] = useState("");
  var routineID = "";

  let add_exercise = () => {
    navigation.navigate("Add Exercise", {
      routineID,
    });
    console.log("called add_exercise");
  };

  let add_user = () => {
    console.log(RoutineName);

    if (!RoutineName) {
      alert("Please enter Routine Name");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO routine_table (routine_name) VALUES (?)",
        [RoutineName],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            // get routine_id from insertID result to pass to AddExercise.js
            routineID = results.insertId;
            console.log(routineID);

            add_exercise();
          } else alert("Creating Routine Failed");
        }
      );
    }, []);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 5,
        }}
      >
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
        <Text>Create Exercise</Text>
        <Button
          icon={
            <Icon name="done-all" size={20} color="gray" type="materialicons" />
          }
          type="clear"
          onPress={() => {
            add_user();
          }}
        />
      </View>
      <View>
        <TextInput
          style={SIZES.input}
          onChangeText={setRoutineName}
          value={RoutineName}
          placeholder={"Enter Routine Name"}
        ></TextInput>
      </View>
    </SafeAreaView>
  );
};

export default Add;
