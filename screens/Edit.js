import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TextInput, Alert } from "react-native";
import { db } from "../components/DatabaseH";
import { Icon, Button } from "react-native-elements";

//route contain routine ID for searchRoutine()
const edit = ({ navigation, route }) => {
  let { selectedID, where } = route.params; //routine_id
  let [editName, setEditName] = useState("");
  // "SELECT * FROM routine_table where routine_id = ?";
  var queryBuilder1 = "";
  var queryBuilder2 = "";
  // see which page called the edit

  //would these be better to passing from route?
  if (where == "from homepage") {
    queryBuilder1 = "SELECT * FROM routine_table where routine_id = ?";
    queryBuilder2 =
      "UPDATE routine_table set routine_name=? where routine_id=?";
  } else if (where == "from all exercise page") {
    queryBuilder1 = "SELECT * FROM exercise_table where exercise_id = ?";
    queryBuilder2 =
      "UPDATE exercise_table set exercise_name=? where exercise_id=?";
  }
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(queryBuilder1, [selectedID], (tx, results) => {
        var len = results.rows.length;
        if (len > 0 && where == "from homepage") {
          let res = results.rows.item(0);
          setEditName(res.routine_name);
        } else if (len > 0 && where == "from all exercise page") {
          let res = results.rows.item(0);
          setEditName(res.exercise_name);
        } else {
          alert("Not found");
        }
      });
    });
  }, []);

  let updateRoutine = () => {
    if (!editName) {
      alert("Please enter a name");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(queryBuilder2, [editName, selectedID], (tx, results) => {
        console.log("Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            "Success",
            "Updated successfully",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("Home"),
              },
            ],
            { cancelable: false }
          );
        } else alert("Updation Failed");
      });
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
          value={editName}
          onChangeText={(editName) => {
            setEditName(editName);
          }}
        />
        <Button
          icon={<Icon name="x-circle" size={15} color="gray" type="feather" />}
          type="clear"
          onPress={() => {
            setEditName("");
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
