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
import { ErroProvider } from "./src/contexts/ErroCampoTextoContext";
import useAuthStore from "./src/hooks/useAuthStore";
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";
import { LoadingProvider } from "./src/contexts/LoadingContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SairDeFormularioProvider } from "./src/contexts/SairDeFormulariosContext";
import * as Location from "expo-location";
import useLocationStore from "./src/hooks/useLocationStore";
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
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: `Erro ao recuperar token do AsyncStorage: ${error}`,
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    };

    verificarTokenArmazenado();
  }, []);

  useEffect(() => {
    const obterLocalizacao = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permissão de Localização Negada",
          text2:
            "Você precisa permitir o acesso à localização para usar este aplicativo.",
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      useLocationStore.getState().setLocalizacaoUsuario(location);
    };

    obterLocalizacao();
  }, []);

  useEffect(() => {
    const subscription = Location.watchPositionAsync({}, (location) => {
      useLocationStore.getState().setLocalizacaoUsuario(location);
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  if (!fonteCarregada) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SairDeFormularioProvider>
          <LoadingProvider>
            <ErroProvider>
              <RotasPrincipais />
            </ErroProvider>
            <Toast />
          </LoadingProvider>
        </SairDeFormularioProvider>
      </GestureHandlerRootView>
    );
  }
}
