import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

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
        source={require("../assets/images/recipes/spagetti.png")}
        resizeMode="cover"
        style={{ width: 100, height: 100, borderRadius: SIZES.radius }}
      />
      <View style={{ width: "65%", paddingHorizontal: 20 }}>
        <Text style={{ flex: 1 }}>{categoryItem.name}</Text>
        <Text style={{ color: COLORS.gray }}>
          {categoryItem.duration} | {categoryItem.serving} serving
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
