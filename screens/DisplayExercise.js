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

import { FONTS, COLORS, SIZES, images, icons } from "../constants";

var db = SQLite.openDatabase("UserDatabase.db");

//test display exercise_table items
const DisplayExercise = ({ navigation, route }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  const { selectedRoutine } = route.params;

  function renderList() {
    useEffect(() => {
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT * FROM exercise_table WHERE routine_id=?",
          [selectedRoutine],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          }
        );
      });
    });
  }
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
                Alert.alert(
                  "You did it",
                  "Good job!",
                  [
                    {
                      text: "Ok",
                      onPress: () => navigation.goBack(),
                    },
                  ],
                  { cancelable: true }
                );
              }}
            />
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default DisplayExercise;
