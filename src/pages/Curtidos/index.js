import React, { useCallback } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import colors from "../../styles/colors";
import ApresentacaoEspaco from "../../components/ApresentacaoEspaco";
import CabecalhoTitulo from "../../components/CabecalhoTitulo";
import Astronauta from "../../../assets/astronauta.svg";
import useEspacosCurtidos from "../../hooks/useEspacosCurtidos";
import { useFocusEffect } from "@react-navigation/native";
import useAuthStore from "../../hooks/useAuthStore";

export default function Curtidos() {
  const { idUsuario } = useAuthStore((state) => state);
  const { espacosCurtidos, fetchEspacosCurtidos } = useEspacosCurtidos();

  const carregarCurtidos = async () => {
    await fetchEspacosCurtidos(Number(idUsuario));
  };

  useFocusEffect(
    useCallback(() => {
      carregarCurtidos();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <CabecalhoTitulo titulo="Curtidos" />
      {espacosCurtidos && espacosCurtidos?.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerCurtidos}>
            {espacosCurtidos &&
              espacosCurtidos?.map((espaco, index) => (
                <ApresentacaoEspaco key={index} espaco={espaco} />
              ))}
          </View>
        </ScrollView>
      )}
      {espacosCurtidos?.length === 0 && (
        <View style={styles.containerZeroCurtidos}>
          <Image source={Astronauta} style={styles.imagemAstronauta} />
          <Text style={styles.textoLegendaNaoTem}>
            Você ainda não curtiu nenhum espaço....
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  containerCurtidos: {
    display: "flex",
    marginTop: 20,
    gap: 20,
  },
  containerZeroCurtidos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  imagemAstronauta: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  textoLegendaNaoTem: {
    fontFamily: "Quicksand600",
    fontSize: 16,
    color: colors.corTextoPreto,
    textAlign: "center",
  },
});
