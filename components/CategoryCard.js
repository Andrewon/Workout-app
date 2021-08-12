import React from "react";
import { View, TouchableOpacity, Text, Image, Button } from "react-native";
import DeleteStuff from "../screens/Delete";

import { COLORS, FONTS, SIZES } from "../constants";

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
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
      <Image
        source={require("../assets/images/recipes/icons8-weightlifting-96.png")}
        resizeMode="cover"
        style={{ width: 100, height: 100, borderRadius: SIZES.radius }}
      />
      <View style={{ width: "65%", paddingHorizontal: 20 }}>
        <Text style={{ flex: 1 }}>{categoryItem.routine_name}</Text>
        <Text style={{ color: COLORS.gray }}>
          {categoryItem.duration} Rep | {categoryItem.serving} Set
        </Text>
        <Button
          title={"Delete"}
          onPress={() => DeleteStuff({ deleteInfo: categoryItem.routine_id })}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
