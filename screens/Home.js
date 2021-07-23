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

import { FONTS, COLORS, SIZES, images, icons, dummyData } from "../constants";

function ParseData() {
  const [Datas, setDatas] = React.useState(null);

  React.useEffect(() => {
    dummyData.db.transaction((tx) => {
      tx.executeSql("select * from recipes", [], (_, { rows: { _array } }) =>
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
        data={Datas}
        keyExtractor={(item) => "${item.id}"}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View></View>}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.name}</Text>
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
          "create table if not exists recipes (id integer primary key not null, name string, duration string, serving integer, category string );"
        );
        console.log("database created");
        tx.executeSql("select * from recipes", [], (_, { rows }) =>
          console.log(JSON.stringify(rows) + "hi")
        );
      });
    }
    dummyData.db.transaction((tx) => {
      tx.executeSql();
      tx.executeSql();

      tx.executeSql("select * from recipes", [], (_, { rows }) =>
        console.log(JSON.stringify(rows) + "hi")
      );
    });
  }, []);
}

var execute = false;
const Home = ({ navigation }) => {
  DataInit();
  return <ParseData></ParseData>;
};

export default Home;
