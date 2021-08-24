import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import ExerciseCard from "../components/ExerciseCard";
import getCurrentSession from "../components/getCurrentSession";

import { FONTS, COLORS, SIZES, images, icons } from "../constants";
import { Platform } from "react-native";

var db = SQLite.openDatabase("UserDatabase.db");

//test display exercise_table items
const DisplayExercise = ({ navigation, route }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  const { selectedRoutine } = route.params;
  var currentSessionID = getCurrentSession(selectedRoutine);

  function renderList() {
    useEffect(() => {
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT * FROM exercise_table WHERE routine_id = ?",
          [selectedRoutine],
          (tx, results) => {
            var temp = [];

            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
              // console.log(results.rows.item(2).exercise_name);
            }

            setFlatListItems(temp);
          }
        );
      });
    });
  }

  const finishSession = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "UPDATE session_table SET session_status=? WHERE routine_id=? AND session_status=?",
        [currentSessionID, selectedRoutine, 0],
        (tx, results) => {
          console.log("Finished session", results);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar barStyle={"default"} />

      <FlatList
        data={flatListItems}
        keyExtractor={(item, index) => "${item.exercise_id}" + index}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View>{renderList()}</View>}
        renderItem={({ item }) => {
          return (
            <View>
              <ExerciseCard
                containerStyle={{ marginHorizontal: SIZES.padding }}
                exerciseItem={item}
                onPress={() => console.log("pressed on exercise")}
              />

              {/* prettier-ignore */}
              {/* <Text>
                Exercise name:{item.exercise_name} Set: {item.eset} Rep: {item.rep}
              </Text> */}
            </View>
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 100,
            }}
          >
            <Button
              title={"Finish"}
              onPress={() => {
                if (Platform.OS === "web") {
                  finishSession();
                } else {
                  Alert.alert(
                    "You did it",
                    "Good job!",
                    [
                      {
                        text: "Ok",
                        onPress: () => {
                          finishSession();
                          navigation.goBack();
                        },
                      },
                    ],
                    { cancelable: true }
                  );
                }
              }}
            />
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default DisplayExercise;
