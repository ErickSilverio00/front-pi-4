import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Mensagens from "../pages/Mensagens";

const Stack = createNativeStackNavigator();

export default function RotasMensagens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mensagens"
        component={Mensagens}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
