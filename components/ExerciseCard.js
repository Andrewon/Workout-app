import React from "react";
import { View, TouchableOpacity, Text, Image, Button } from "react-native";
import DeleteStuff from "../screens/Delete";

import { COLORS, FONTS, SIZES } from "../constants";

const ExerciseCard = ({ containerStyle, exerciseItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        ...containerStyle,
      }}
      onPress={onPress}
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
};

export default ExerciseCard;
