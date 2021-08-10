import React from "react";
import { DisplayExercise, AddExercise, Add } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
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
};

export default App;
