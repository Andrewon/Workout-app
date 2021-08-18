import React from "react";
import { View, TouchableOpacity, Text, Image, Button } from "react-native";
import DeleteStuff from "../screens/Delete";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONTS, SIZES } from "../constants";

const CategoryCard = ({
  numOfExercise,
  containerStyle,
  categoryItem,
  onPress,
}) => {
  const navigation = useNavigation();
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
        style={{
          width: 100,
          height: 100,
          borderRadius: SIZES.radius,
          //backgroundColor: "blue",
        }}
      />
      <View
        style={{
          width: "65%",
          flexDirection: "collum",
          //backgroundColor: "red",
          flex: 1,
        }}
      >
        <View //name + rep | set container
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            //backgroundColor: "green",
            flex: 1,
          }}
        >
          <Text numberOfLines={1} style={{ flex: 1 }}>
            {categoryItem.routine_name}
          </Text>
          <Text style={{ color: COLORS.gray, paddingTop: 10 }}>
            {numOfExercise} Rep | {categoryItem.serving} Set
          </Text>
        </View>
        <View //container fro delete and edit buttons
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            //backgroundColor: "black",
          }}
        >
          <Button
            title={"Delete"}
            onPress={() => DeleteStuff({ deleteInfo: categoryItem.routine_id })}
          />
          <Button
            title={"Edit"}
            onPress={() =>
              navigation.navigate("Edit Routine", {
                selectedRoutine: categoryItem.routine_id,
              })
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
