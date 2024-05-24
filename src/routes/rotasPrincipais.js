import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../styles/colors";
import RotasPesquisar from "./rotasPesquisar";
import RotasCurtidos from "./rotasCurtidos";
import RotasMensagens from "./rotasMensagens";
import RotasPerfil from "./rotasPerfil";

const Tab = createBottomTabNavigator();

export default function RotasPrincipais() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (route.name === "RotasPesquisar") {
              return <Icon name="search" size={22} color={color} />;
            } else if (route.name === "RotasCurtidos") {
              return <Icon name="heart" size={22} color={color} />;
            } else if (route.name === "RotasMensagens") {
              return <Icon name="message-circle" size={22} color={color} />;
            } else if (route.name === "RotasPerfil") {
              return <Icon name="user" size={22} color={color} />;
            }
          },
          tabBarActiveTintColor: colors.primaria,
          tabBarInactiveTintColor: colors.cinzaEscuro,
          tabBarLabelStyle: {
            fontFamily: "Quicksand600",
          },
          tabBarLabel: route?.name.replace("Rotas", ""),
        })}
      >
        <Tab.Screen name="RotasPesquisar" component={RotasPesquisar} />
        <Tab.Screen name="RotasCurtidos" component={RotasCurtidos} />
        <Tab.Screen name="RotasMensagens" component={RotasMensagens} />
        <Tab.Screen name="RotasPerfil" component={RotasPerfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
