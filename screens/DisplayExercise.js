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
        } else {
          console.log("DisplayExercise.js dismounted");
        }
      });

      return function cleanup() {
        mounted = false;
      };
    }, [rerender]);
  }

  const renderDisplayExerciseHeader = () => {
    // let [sessionDataList, setSessionData] = useState([]);
    // db.transaction(function (txn) {
    //   txn.executeSql(
    //     "SELECT * FROM session_table WHERE routine_id=?",
    //     [selectedRoutine],
    //     (tx, results) => {
    //       var temp = [];
    //       for (let i = 0; i < results.rows.length; ++i) {
    //         temp.push(results.rows.item(i));
    //       }
    //       setSessionData(temp);
    //     }
    //   );
    // });
    // return (
    //   <ScrollView style={{ height: 200 }}>
    //     {sessionDataList.map((data) => {
    //       return (
    //         <View key={data.session_id}>
    //           <Text>
    //             {data.session_id} name: {data.exercise_name}
    //           </Text>
    //         </View>
    //       );
    //     })}
    //   </ScrollView>
    // );
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
        ListHeaderComponent={
          <View>
            {(renderList(), renderDisplayExerciseHeader())}
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
