import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Pesquisar from "../pages/Pesquisar";
import PaginaEspaco from "../pages/Pesquisar/PaginaEspaco";
import Filtros from "../pages/Pesquisar/Filtros";


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
        name="PaginaEspaco"
        component={PaginaEspaco}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Filtros"
        component={Filtros}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
