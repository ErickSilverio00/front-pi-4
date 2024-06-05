import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Curtidos from "../pages/Curtidos";
import RotasEspaco from "./rotasEspaco";

const Stack = createNativeStackNavigator();

export default function RotasCurtidos() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Curtidos"
        component={Curtidos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RotasEspaco"
        component={RotasEspaco}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
