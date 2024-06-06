import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../../styles/colors";
import ApresentacaoEspaco from "../../components/ApresentacaoEspaco";
import { formatarMoeda } from "../../utils/funcoes";
import CabecalhoTitulo from "../../components/CabecalhoTitulo";
import { ScrollView } from "react-native";
import { fetchEspacosCurtidos } from "../../services/Curtidos";
import useAuthStore from "../../hooks/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import Astronauta from "../../../assets/astronauta.svg";
import { useLoading } from "../../contexts/LoadingContext";

export default function Curtidos() {
  const user = useAuthStore();
  const navigation = useNavigation();
  const { setIsLoading } = useLoading();
  const [espacosCurtidos, setEspacosCurtidos] = useState([]);

  const carregarEspacosCurtidos = async () => {
    try {
      setIsLoading(true);
      const espacos = await fetchEspacosCurtidos(Number(user.idUsuario));
      setEspacosCurtidos(espacos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      carregarEspacosCurtidos();
    });

    carregarEspacosCurtidos();

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CabecalhoTitulo titulo="Curtidos" />
      {espacosCurtidos.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerCurtidos}>
            {espacosCurtidos?.map((espaco, index) => (
              <ApresentacaoEspaco
                key={index}
                carregarEspacosCurtidos={carregarEspacosCurtidos}
                espaco={espaco}
              />
            ))}
          </View>
        </ScrollView>
      )}
      {espacosCurtidos.length === 0 && (
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
  headerContainer: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: "center",
    backgroundColor: colors.branco,
  },
  headerText: {
    fontFamily: "Quicksand600",
    fontSize: 24,
    color: colors.corTextoPreto,
    marginTop: 10,
  },
  headerLine: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.14)",
    width: "80%",
    marginTop: 15,
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
