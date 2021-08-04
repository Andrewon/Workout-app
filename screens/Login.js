import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Button,
} from "react-native";
import * as SQLite from "expo-sqlite";

import { FONTS, COLORS, SIZES, images, icons } from "../constants";

import { recipe } from "../screens";

var db = SQLite.openDatabase("UserDatabase.db");

//test display exercise_table items
const Login = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  function renderHeader() {
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
              <Text>
                Exercise name:{item.exercise_name} Set: {item.set}
              </Text>
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

export default Login;
