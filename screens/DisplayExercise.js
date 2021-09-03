import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, StatusBar } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { db } from "../components/DatabaseH";
import ExerciseCard from "../components/ExerciseCard";
import finishSession from "../components/finishSession";
import { Button, Icon } from "react-native-elements";

import { FONTS, COLORS, SIZES, images, icons } from "../constants";
import { Platform } from "react-native";
import { Dimensions } from "react-native";
//test display exercise_table items
const DisplayExercise = ({ navigation, route }) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [exerciseID, setExerID] = useState(0);
  let [sessionData, setSessionData] = useState([]);
  let [exerciseName, setExerName] = useState("");

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
              }

              setFlatListItems(temp);
              console.log("rendering");
            }
          );

          txn.executeSql(
            "SELECT DISTINCT weight, strftime('%m/%d', session_date) as session_date FROM session_table WHERE routine_id=? AND exercise_id=?",
            [selectedRoutine, exerciseID],
            (tx, results) => {
              var temp2 = [];

              for (let i = 0; i < results.rows.length; ++i) {
                temp2.push(results.rows.item(i));
              }

              setSessionData(temp2);
              console.log("session data populating", temp2);
            }
          );
        } else {
          console.log("DisplayExercise.js dismounted");
        }
      });

      return function cleanup() {
        mounted = false;
      };
    }, [exerciseID]);
  }

  const data = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  if (sessionData.length != 0) {
    for (let i = 0; i < sessionData.length; i++) {
      const { weight, session_date } = sessionData[i];
      data.labels.push(session_date);
      data.datasets[0].data.push(weight);
      console.log(data);
    }
  } else {
    data.labels.push("today");
    data.datasets[0].data.push(0);
  }

  const RenderDisplayExerciseHeader = () => {
    console.log("Tim session length", sessionData.length);
    return (
      <View>
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
          <Text>
            {exerciseName ? exerciseName : "Select an exercise to display"}{" "}
            progress
          </Text>
          <Button
            icon={
              <Icon
                name="done-all"
                size={20}
                color="gray"
                type="materialicons"
              />
            }
            type="clear"
            onPress={() => {
              if (Platform.OS === "web") {
                finishSession(selectedRoutine);
              } else {
                finishSession(selectedRoutine);
              }
            }}
          />
        </View>
        <LineChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=" lbs"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#0078e0",
            backgroundGradientFrom: "#009efa",
            backgroundGradientTo: "#24cfff",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 4,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginTop: 1,
            marginBottom: 5,
          }}
        />
        {/* prettier-ignore */}
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
        ListHeaderComponent={<View>{renderList()}</View>}
        renderItem={({ item }) => {
          return (
            <View>
              <ExerciseCard
                containerStyle={{ marginHorizontal: SIZES.padding }}
                exerciseItem={item}
                onPress={() => {
                  setExerID(item.exercise_id);
                  setExerName(item.exercise_name);
                }}
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

export default DisplayExercise;
