import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Curtidos from "../pages/Curtidos";
import PaginaEspaco from "../pages/PaginaEspaco";

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
        name="PaginaEspaco"
        component={PaginaEspaco}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
