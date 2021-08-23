import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Button,
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import * as SQLite from "expo-sqlite";
import getCurrentDate from "../components/getDateTime";

import { FONTS, COLORS, SIZES, images, icons, dummyData } from "../constants";
import { Platform } from "react-native";

var db = SQLite.openDatabase("UserDatabase.db");
var currentDate = getCurrentDate();

const Home = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(function (txn) {
      if (Platform.OS === "web") {
        console.log("web browser", currentDate);
      } else {
        txn.executeSql(
          "PRAGMA foreign_keys = ON",
          [],
          console.log("foreign key ON")
        );
      }
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='routine_table'",
        [],
        function (tx, res) {
          console.log("item_routine:", res.rows.length);
          if (res.rows.length == 0) {
            tx.executeSql("DROP TABLE IF EXISTS routine_table", []);
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS routine_table(routine_id INTEGER PRIMARY KEY AUTOINCREMENT, routine_name VARCHAR(20), exercises_count INTEGER)",
              [],
              (tx, results) => {
                console.log("Results_routine", results.rowsAffected);
              },
              (tx, error) => {
                console.log(error);
              }
            );
          }
        }
      );

      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='exercise_table'",
        [],
        function (tx, res) {
          console.log("item_exercise:", res.rows.length);
          if (res.rows.length == 0) {
            tx.executeSql("DROP TABLE IF EXISTS exercise_table", []);
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS exercise_table(exercise_id INTEGER PRIMARY KEY AUTOINCREMENT, exercise_name VARCHAR(20), eset INTEGER, rep INTEGER, routine_id INTEGER, FOREIGN KEY (routine_id) REFERENCES routine_table(routine_id))",
              [],
              (tx, results) => {
                console.log("Results_exercise", results.rowsAffected);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DROP TABLE IF EXISTS session_table", []);
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS session_table(session_id INTEGER PRIMARY KEY AUTOINCREMENT, session_date DATETIME, exercise_name VARCHAR(20), eset INTEGER, rep INTEGER, routine_id INTEGER, exercise_id INTEGER, FOREIGN KEY (routine_id) REFERENCES routine_table(routine_id))",
              [],
              (tx, results) => {
                console.log("Results_session", results.rowsAffected);
              },
              (tx, error) => {
                console.log(error);
              }
            );
          }
        }
      );
    });
  }, []);

  function renderHeader() {
    useEffect(() => {
      db.transaction(function (txn) {
        txn.executeSql("SELECT * FROM routine_table", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
      });
    });

    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          alignItems: "center",
          height: 80,
        }}
      >
        {/* Welcome text */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.darkGreen, ...FONTS.h2 }}>
            Hello Andy,
          </Text>
          <Text style={{ marginTop: 3, color: COLORS.gray, ...FONTS.body3 }}>
            What are you working out today?
          </Text>
        </View>
      </View>
    );
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
        keyExtractor={(item, index) => "${item.routine_id}" + index}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}
            {/* Create New  routine, maybe darkmode button, edit button */}
            <Button
              onPress={() => {
                navigation.navigate("Create");
              }}
              title={"Create Routine"}
            />
            {/* See Routine Card */}
            {/* Category Header */}
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View>
              <CategoryCard
                containerStyle={{ marginHorizontal: SIZES.padding }}
                categoryItem={item}
                onPress={() =>
                  navigation.navigate("Display Exercise", {
                    selectedRoutine: item.routine_id,
                  })
                }
              />
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

export default Home;
