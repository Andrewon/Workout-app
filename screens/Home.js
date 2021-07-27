import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CategoryCard from "../components/CategoryCard";

import { FONTS, COLORS, SIZES, images, icons, dummyData } from "../constants";

function renderHeader() {
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
      <Text style={{ color: COLORS.darkGreen, ...FONTS.h2 }}>Hello Andy,</Text>
      <Text style={{ marginTop: 3, color: COLORS.gray, ...FONTS.body3 }}>
        What are you working out today?
      </Text>
    </View>
  </View>;
}

function ParseData() {
  const [Datas, setDatas] = React.useState(null);

  React.useEffect(() => {
    dummyData.db.transaction((tx) => {
      tx.executeSql("select * from recipes4", [], (_, { rows: { _array } }) =>
        setDatas(_array)
      );
    });
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
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
}

function DataInit() {
  var execute = false;
  return React.useEffect(() => {
    if (!execute) {
      execute = true;
      dummyData.db.transaction((tx) => {
        tx.executeSql(
          "create table if not exists recipes4 (id integer primary key not null autoincrement, name string, duration string, serving integer, category string );"
        );
        //prettier-ignore
        tx.executeSql("insert into recipes4 (id,name,duration,serving,category)",[1, "andy", "30 mins", 1, "Local"]);
        tx.executeSql("select * from recipes4", [], (_, { rows }) =>
          console.log(JSON.stringify(rows) + "recipes")
        );
      });
    }
  }, []);
}

var execute = false;
const Home = ({ navigation }) => {
  return <ParseData></ParseData>;
};

export default Home;
