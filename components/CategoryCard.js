import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import DeleteStuff from "../screens/Delete";
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from "react-native-elements";

import { COLORS, FONTS, SIZES } from "../constants";

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
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
          <Text numberOfLines={1} style={{ flex: 1, ...FONTS.h2 }}>
            {categoryItem.routine_name}
          </Text>
          {/* prettier-ignore */}
          <Text style={{ ...FONTS.body4, color: COLORS.gray, paddingTop: 10 }}>
            {categoryItem.exercises_count} Exercise(s) | {categoryItem.exercises_count * 9} mins | ID: {categoryItem.routine_id}
          </Text>
        </View>
        <View //container for delete and edit buttons
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            //backgroundColor: "black",
          }}
        >
          <Button
            icon={<Icon name="edit" size={15} color="gray" type="AntDesign" />}
            type="clear"
            onPress={() =>
              navigation.navigate("Edit Routine", {
                selectedID: categoryItem.routine_id,
                where: "from homepage",
              })
            }
          />
          <Button
            icon={
              <Icon name="delete" size={15} color="gray" type="AntDesign" />
            }
            type="clear"
            onPress={() => DeleteStuff({ deleteInfo: categoryItem.routine_id })}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
