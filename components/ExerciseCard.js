import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DeleteStuff from "../screens/Delete";
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from "react-native-elements";
import UpdateSession from "./UpdateSession";
import { Divider } from "react-native-elements";
import getCurrentDate from "./getDateTime";

import { COLORS, FONTS, SIZES } from "../constants";
import getCurrentSession from "./getCurrentSession";

const ExerciseCard = ({ containerStyle, exerciseItem, onPress, where }) => {
  const navigation = useNavigation();
  var currentDate = getCurrentDate();
  var currentSessionID = getCurrentSession(exerciseItem.routine_id);

  const [tabColor, setTabColor] = useState(true);
  const switchTabColor = () => setTabColor((prevState) => !prevState);

  //which screen is calling ExerciseCard
  if (where == "Display All") {
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ paddingVertical: 3, paddingStart: 15 }}>
            {exerciseItem.exercise_name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              icon={
                <Icon name="edit" size={15} color="gray" type="AntDesign" />
              }
              type="clear"
              onPress={() =>
                navigation.navigate("Edit Routine", {
                  selectedID: exerciseItem.exercise_id,
                  where: "from all exercise page",
                })
              }
            />

            <Button
              icon={
                <Icon name="delete" size={15} color="gray" type="AntDesign" />
              }
              type="clear"
              onPress={() =>
                DeleteStuff({ deleteInfo: categoryItem.routine_id })
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    //if called from homescreen
    return (
      <TouchableOpacity
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
          marginTop: 10,
          borderRadius: SIZES.radius,
          backgroundColor: tabColor ? COLORS.gray2 : COLORS.lightGreen,
          ...containerStyle,
        }}
        // onPress={() => switchTabColor()}
        onPress={() => {
          alert("from exercise card" + currentSessionID);
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text numberOfLines={1} style={{ ...FONTS.body3 }}>
            {exerciseItem.exercise_name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...FONTS.body3 }}>{exerciseItem.rep} reps X </Text>
            <Text style={{ ...FONTS.body3 }}>{exerciseItem.eset} sets</Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <Divider orientation="horizontal" color="#939296" />
        </View>

        {/* if (rep!=0) */}
        <View style={{ width: "100%" }}>
          <UpdateSession
            exercise_name={exerciseItem.exercise_name}
            exercise_id={exerciseItem.exercise_id}
            routine_id={exerciseItem.routine_id}
            totalSet={exerciseItem.eset}
            currentDate={currentDate}
          />
        </View>

        {/* else card color turn green */}
      </TouchableOpacity>
    );
  }
};

export default ExerciseCard;
