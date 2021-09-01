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
import { db } from "../components/DatabaseH";
import ExerciseCard from "../components/ExerciseCard";
import displaySessionData from "../components/displaySessionData";

import finishSession from "../components/finishSession";

import { FONTS, COLORS, SIZES, images, icons } from "../constants";
import { Platform } from "react-native";

//test display exercise_table items
const DisplayExercise = ({ navigation, route }) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [rerender, setRender] = useState(0);
  let [sessionData, setSessionData] = useState([]);

  const { selectedRoutine } = route.params;

  function renderList() {
    useEffect(() => {
      let mounted = true;

      db.transaction(function (txn) {
        if (mounted) {
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
              console.log("rendering");
            }
          );

          txn.executeSql(
            "SELECT * FROM session_table WHERE routine_id=?",
            [selectedRoutine],
            (tx, results) => {
              var temp2 = [];

              for (let i = 0; i < results.rows.length; ++i) {
                temp2.push(results.rows.item(i));
              }

              setSessionData(temp2);
              console.log("session data populating");
            }
          );
        } else {
          console.log("DisplayExercise.js dismounted");
        }
      });

      return function cleanup() {
        mounted = false;
      };
    }, [rerender]);
  }

  const RenderDisplayExerciseHeader = () => {
    console.log(sessionData[0] && sessionData[0].eset);
    return (
      <View style={{ height: "200px" }}>
        <Text>result {sessionData[0] && sessionData[0].eset}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar barStyle={"default"} />
      <RenderDisplayExerciseHeader> </RenderDisplayExerciseHeader>
      <FlatList
        data={flatListItems}
        keyExtractor={(item, index) => "${item.exercise_id}" + index}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderList()}
            <Button
              title={"Finish"}
              onPress={() => {
                if (Platform.OS === "web") {
                  finishSession(selectedRoutine);
                } else {
                  finishSession(selectedRoutine);
                }
              }}
            />
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View>
              <ExerciseCard
                containerStyle={{ marginHorizontal: SIZES.padding }}
                exerciseItem={item}
                onPress={() => setRender(rerender + 1)}
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
          ></View>
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default DisplayExercise;
