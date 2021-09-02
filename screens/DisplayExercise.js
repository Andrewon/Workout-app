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
// import { LineChart } from "react-native-chart-kit";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { db } from "../components/DatabaseH";
import ExerciseCard from "../components/ExerciseCard";
import displaySessionData from "../components/displaySessionData";

import finishSession from "../components/finishSession";

import { FONTS, COLORS, SIZES, images, icons } from "../constants";
import { Platform } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

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
                // console.log(results.rows.item(2).exercise_name);
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
    const data = [
      50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80, 24, 85,
      91, 35, 53, -53, 24, 50, 24, 85, 91, 35, 53, -53, 24, 50, 24, 85, 91, 35,
      53, -53, 24, 50,
    ];

    const axesSvg = { fontSize: 10, fill: "grey" };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;

    console.log("Tim session length", sessionData.length);
    return (
      <View>
        {/* prettier-ignore */}
        <Text>
          {exerciseName ? exerciseName : "Select an exercise to display"} progress
        </Text>
        <View style={{ height: 200, padding: 20, flexDirection: "row" }}>
          <YAxis
            data={data}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={data}
              contentInset={verticalContentInset}
              svg={{ stroke: "rgb(134, 65, 244)" }}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={data}
              formatLabel={(value, index) => index}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
          </View>
        </View>
        {/* <LineChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="lbs"
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
            marginVertical: 8,
            borderRadius: 4,
          }}
        /> */}
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
                onPress={() => {
                  setExerID(item.exercise_id);
                  setExerName(item.exercise_name);
                }}
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
