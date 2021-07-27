import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import CategoryCard from "../components/CategoryCard";

import { FONTS, COLORS, SIZES, images, icons, dummyData } from "../constants";

const Home = ({ navigation }) => {
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          alignItems: "center",
          height: 80,
        }}
      >
        {/* Hello text */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.darkGreen, ...FONTS.h2 }}>
            Hello Andy,
          </Text>
          <Text style={{ marginTop: 3, color: COLORS.gray, ...FONTS.body3 }}>
            What are you working out today?
          </Text>
        </View>
      </View>
    );
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
        data={dummyData.categories}
        keyExtractor={(item) => "${item.id}"}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}
            {/* Search bar */}
            {/* See workout card */}
            {/* category Header */}
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View>
              <CategoryCard
                containerStyle={{ marginHorizontal: SIZES.padding }}
                categoryItem={item}
                onPress={() => navigation.navigate("Recipe", { recipe: item })}
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

export default Home;
