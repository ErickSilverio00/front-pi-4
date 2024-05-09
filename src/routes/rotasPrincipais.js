import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../styles/colors";
import Curtidos from "../pages/Curtidos";
import Mensagens from "../pages/Mensagens";
import RotasPerfil from "./rotasPerfil";
import RotasPesquisar from "./rotasPesquisar";

const Tab = createBottomTabNavigator();

export default function RotasPrincipais() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (route.name === "Pesquisar") {
              return <Icon name="search" size={22} color={color} />;
            } else if (route.name === "Curtidos") {
              return <Icon name="heart" size={22} color={color} />;
            } else if (route.name === "Mensagens") {
              return <Icon name="message-circle" size={22} color={color} />;
            } else if (route.name === "Perfil") {
              return <Icon name="user" size={22} color={color} />;
            }
          },
          tabBarActiveTintColor: colors.primaria,
          tabBarInactiveTintColor: colors.cinzaEscuro,
          tabBarLabelStyle: {
            fontFamily: "Quicksand600",
          },
        })}
      >
        <Tab.Screen name="Pesquisar" component={RotasPesquisar} />
        <Tab.Screen name="Curtidos" component={Curtidos} />
        <Tab.Screen name="Mensagens" component={Mensagens} />
        <Tab.Screen name="Perfil" component={RotasPerfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
