import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PaginaEspaco from "../pages/PaginaEspaco";
import Servico from "../pages/PaginaEspaco/Servico";
import InfoVendas from "../pages/PaginaEspaco/InfoVendas";

const Stack = createNativeStackNavigator();

export default function RotasEspaco() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PaginaEspaco"
        component={PaginaEspaco}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoVendas"
        component={InfoVendas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Servico"
        component={Servico}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
