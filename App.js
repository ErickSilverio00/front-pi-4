import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { ErroProvider } from "./src/contexts/ErroCampoTextoContext";
import useAuthStore from "./src/hooks/useAuthStore";
import { jwtDecode } from "jwt-decode";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from "expo-location";

export default function App() {
  const [fonteCarregada] = useFonts({
    Quicksand300: Quicksand_300Light,
    Quicksand400: Quicksand_400Regular,
    Quicksand500: Quicksand_500Medium,
    Quicksand600: Quicksand_600SemiBold,
    Quicksand700: Quicksand_700Bold,
  });

  useEffect(() => {
    const verificarTokenArmazenado = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        const storedUserEmail = await AsyncStorage.getItem("userEmail");
        const storedUserId = await AsyncStorage.getItem("idUsuario");
        const storedUserName = await AsyncStorage.getItem("nomeUsuario");

        if (storedAccessToken) {
          useAuthStore
            .getState()
            .login(
              storedAccessToken,
              storedUserEmail,
              storedUserId,
              storedUserName
            );

          const decodedToken = jwtDecode(storedAccessToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("userEmail");
            await AsyncStorage.removeItem("idUsuario");
            useAuthStore.getState().logout();
          }
        }
      } catch (error) {
        console.error("Erro ao recuperar token do AsyncStorage:", error);
      }
    };

    verificarTokenArmazenado();
  }, []);

  useEffect(() => {
    const solicitarPermissaoLocalizacao = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permissão para acessar a localização negada");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
      } catch (error) {
        console.error("Erro ao solicitar permissão de localização:", error);
      }
    };

    solicitarPermissaoLocalizacao();
  }, []);

  if (!fonteCarregada) {
    return <CarregamentoDeTela />;
  } else {
    return (
      <>
        <ErroProvider>
          <RotasPrincipais />
        </ErroProvider>
        <Toast />
      </>
    );
  }
}
