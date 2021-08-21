import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DeleteStuff from "../screens/Delete";
import { Icon, Button } from "react-native-elements";

import { COLORS, FONTS, SIZES } from "../constants";

const ExerciseCard = ({ containerStyle, exerciseItem, onPress, where }) => {
  const [tabColor, setTabColor] = useState(true);
  const switchTabColor = () => setTabColor((prevState) => !prevState);

  //which page is calling ExerciseCard
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
                  selectedRoutine: categoryItem.routine_id,
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
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          marginTop: 10,
          borderRadius: SIZES.radius,
          backgroundColor: tabColor ? COLORS.gray2 : COLORS.lightGreen,
          ...containerStyle,
        }}
        onPress={() => switchTabColor()}
      >
        <View
          style={{
            width: "65%",
            flexDirection: "collum",
            flex: 1,
          }}
        >
          <Text>{exerciseItem.exercise_name}</Text>
          <Text>{exerciseItem.rep} reps</Text>
          <Text>{exerciseItem.eset} sets</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default ExerciseCard;
