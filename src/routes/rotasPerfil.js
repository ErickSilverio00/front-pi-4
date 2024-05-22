import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../pages/Perfil/FluxoDeAutenticacao/Login";
import Cadastro from "../pages/Perfil/FluxoDeAutenticacao/Cadastro";
import EsqueciSenha from "../pages/Perfil/FluxoDeAutenticacao/EsqueciSenha";
import Perfil from "../pages/Perfil";
import Configuracoes from "../pages/Perfil/Configuracoes";
import TornarAnunciante from "../pages/Perfil/TornarAnunciante";
import PaginaEspaco from "../pages/PaginaEspaco";

const Stack = createNativeStackNavigator();

export default function RotasPerfil() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EsqueciSenha"
        component={EsqueciSenha}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TornarAnunciante"
        component={TornarAnunciante}
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
