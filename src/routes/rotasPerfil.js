import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../pages/Perfil/FluxoDeAutenticacao/Login";
import Cadastro from "../pages/Perfil/FluxoDeAutenticacao/Cadastro";
import EsqueciSenha from "../pages/Perfil/FluxoDeAutenticacao/EsqueciSenha";
import Perfil from "../pages/Perfil";

const Stack = createNativeStackNavigator();

export default function RotasPerfil() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="perfil"
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
      {/* <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfiguracoesSuporte"
        component={ConfiguracoesSuporte}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Suporte"
        component={Suporte}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PublicacoesCurtidas"
        component={PublicacoesCurtidas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QueroSerOrganizadorPerfil"
        component={QueroSerOrganizadorPerfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PagamentosPerfil"
        component={PagamentosPerfil}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
