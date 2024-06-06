import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SliderCarrossel from "../SliderCarrossel";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../hooks/useAuthStore";
import useEspacosCurtidos from "../../hooks/useEspacosCurtidos";
import Toast from "react-native-toast-message";
import colors from "../../styles/colors";
import { formatarMoeda } from "../../utils/funcoes";
import { useLoading } from "../../contexts/LoadingContext";

export default function ApresentacaoEspaco({
  carregarEspacosCurtidos,
  espaco,
}) {
  const navigation = useNavigation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore();
  const espacosCurtidos = useEspacosCurtidos();
  const { setIsLoading } = useLoading();
  const [curtido, setCurtido] = useState(false);

  useEffect(() => {
    setCurtido(espacoEstaCurtido(espaco?.id_espaco));
  }, [espaco?.id_espaco]);

  const aoClicarEmCurtir = async () => {
    try {
      if (!isAuthenticated) {
        navigation.navigate("Perfil");
        return;
      }
      if (curtido) {
        const idEspacoCurtido = findIdEspacoCurtido(espaco?.id_espaco);
        await espacosCurtidos.removerEspacoCurtido(idEspacoCurtido);
        setCurtido(false);
      } else {
        const curtidosData = {
          idUsuario: Number(user.idUsuario),
          idEspaco: espaco?.id_espaco,
        };
        await espacosCurtidos.adicionarEspacoCurtido(curtidosData);
        setCurtido(true);
      }
      await carregarEspacosCurtidos(Number(user.idUsuario));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.response.data,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const espacoEstaCurtido = (idEspaco) => {
    return espacosCurtidos.espacosCurtidos.some(
      (espaco) => espaco?.id_espaco === idEspaco
    );
  };

  const findIdEspacoCurtido = (idEspaco) => {
    const espacoCurtido = espacosCurtidos.espacosCurtidos.find(
      (espaco) => espaco?.id_espaco === idEspaco
    );
    return espacoCurtido ? espacoCurtido.id_espaco_curtido : null;
  };

  const blocks =
    espaco &&
    espaco?.imagens_espaco.map((foto) => {
      return (
        typeof foto === "string" && { type: "image", content: { uri: foto } }
      );
    });

  return (
    <View>
      <View style={styles.containerCarrossel}>
        <SliderCarrossel
          blocks={blocks}
          curtido={curtido}
          setCurtido={setCurtido}
          aoClicarNaImagem={() =>
            navigation.navigate("RotasEspaco", {
              screen: "PaginaEspaco",
              params: { espaco },
            })
          }
          aoClicarEmCurtir={aoClicarEmCurtir}
        />
      </View>
      <View style={styles.containerTextos}>
        <Text style={styles.textoEspaco}>{espaco?.nome_espaco}</Text>
        <Text style={styles.textoLocalizacao}>
          {espaco?.endereco?.bairro}, {espaco?.endereco?.cidade}
        </Text>
        <Text style={styles.textoPreco}>
          {espaco?.valor_diaria && formatarMoeda(espaco?.valor_diaria)}/noite
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCarrossel: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  containerTextos: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginHorizontal: 16,
  },
  textoEspaco: {
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.corTextoPreto,
  },
  textoLocalizacao: {
    fontFamily: "Quicksand400",
    fontSize: 12,
    color: colors.corTextoPreto,
  },
  textoPreco: {
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.corTextoPreto,
  },
});
