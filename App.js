import React from "react";
import RotasPrincipais from "./src/routes/rotasPrincipais";
import { useFonts } from "expo-font";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import CarregamentoDeTela from "./src/pages/CarregamentoDeTela";

export default function App() {
  const [fonteCarregada] = useFonts({
    Quicksand300: Quicksand_300Light,
    Quicksand400: Quicksand_400Regular,
    Quicksand500: Quicksand_500Medium,
    Quicksand600: Quicksand_600SemiBold,
    Quicksand700: Quicksand_700Bold,
  });
  if (!fonteCarregada) {
    return <CarregamentoDeTela />;
  } else {
    return <RotasPrincipais />;
  }
}
