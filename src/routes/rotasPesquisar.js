import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Pesquisar from "../pages/Pesquisar";
import Filtros from "../pages/Pesquisar/Filtros";
import RotasEspaco from "./rotasEspaco";

const Stack = createNativeStackNavigator();

export default function RotasPesquisar() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pesquisar"
        component={Pesquisar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Filtros"
        component={Filtros}
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
