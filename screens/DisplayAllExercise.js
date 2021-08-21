import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  Button,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import ExerciseCard from "../components/ExerciseCard";
import { Divider } from "react-native-elements";

import { FONTS, COLORS, SIZES, images, icons } from "../constants";

var db = SQLite.openDatabase("UserDatabase.db");

//test display exercise_table items
const DisplayAllExercise = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  function renderList() {
    useEffect(() => {
      db.transaction(function (txn) {
        txn.executeSql("SELECT * FROM exercise_table", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
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
                where={"Display All"}
                containerStyle={{ marginHorizontal: SIZES.padding }}
                exerciseItem={item}
                onPress={() => console.log("pressed an exercise")}
              />
              <Divider orientation="horizontal" />
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
              title={"Go back"}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default DisplayAllExercise;
