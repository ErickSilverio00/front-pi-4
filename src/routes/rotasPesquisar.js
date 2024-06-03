import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Pesquisar from "../pages/Pesquisar";
import PaginaEspaco from "../pages/PaginaEspaco";
import Filtros from "../pages/Pesquisar/Filtros";
import InfoVendas from '../pages/InfoVendas';

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
         <Stack.Screen
        name="InfoVendas"
        component={InfoVendas}
        options={{ headerShown: true, title: 'Informações de Vendas' }} // Configure como desejar
      />
    </Stack.Navigator>
  );
}
