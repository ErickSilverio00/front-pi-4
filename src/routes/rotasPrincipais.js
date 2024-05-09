import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../styles/colors";
import Pesquisar from "../pages/Pesquisar";
import Curtidos from "../pages/Curtidos";
import Mensagens from "../pages/Mensagens";
import Perfil from "../pages/Perfil";
import RotasPerfil from "./rotasPerfil";

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
        <Tab.Screen name="Pesquisar" component={Pesquisar} />
        <Tab.Screen name="Curtidos" component={Curtidos} />
        <Tab.Screen name="Mensagens" component={Mensagens} />
        <Tab.Screen name="Perfil" component={RotasPerfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
