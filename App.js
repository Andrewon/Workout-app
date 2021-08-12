import React from "react";
import { DisplayExercise, AddExercise, Add } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Roboto_900Black,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="Display Exercise" component={DisplayExercise} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Add Exercise" component={AddExercise} />
          <Stack.Screen name="Create" component={Add} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
