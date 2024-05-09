import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SliderCarrossel from "../SliderCarrossel";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../hooks/useAuthStore";
import useEspacosCurtidos from "../../hooks/useEspacosCurtidos";

export default function ApresentacaoEspaco({
  fotos,
  carregarEspacosCurtidos,
  idEspaco,
  nomeEspaco,
  bairroEspaco,
  cidadeEspaco,
  preco,
}) {
  const navigation = useNavigation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore();
  const espacosCurtidos = useEspacosCurtidos();
  const [curtido, setCurtido] = useState(false);

  useEffect(() => {
    setCurtido(espacoEstaCurtido(idEspaco));
  }, [idEspaco]);

  const aoClicarEmCurtir = async () => {
    try {
      if (!isAuthenticated) {
        navigation.navigate("Perfil");
        return;
      }
      if (curtido) {
        const idEspacoCurtido = findIdEspacoCurtido(idEspaco);
        await espacosCurtidos.removerEspacoCurtido(idEspacoCurtido);
        setCurtido(false);
      } else {
        const curtidosData = {
          idUsuario: Number(user.idUsuario),
          idEspaco: idEspaco,
        };
        await espacosCurtidos.adicionarEspacoCurtido(curtidosData);
        setCurtido(true);
      }
      await carregarEspacosCurtidos(Number(user.idUsuario));
    } catch (error) {
      console.error(error);
    }
  };

  const espacoEstaCurtido = (idEspaco) => {
    return espacosCurtidos.espacosCurtidos.some(
      (espaco) => espaco.id_espaco === idEspaco
    );
  };

  const findIdEspacoCurtido = (idEspaco) => {
    const espacoCurtido = espacosCurtidos.espacosCurtidos.find(
      (espaco) => espaco.id_espaco === idEspaco
    );
    return espacoCurtido ? espacoCurtido.id_espaco_curtido : null;
  };

  const blocks = fotos.map((foto) => {
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
          aoClicarEmCurtir={aoClicarEmCurtir}
        />
      </View>
      <View style={styles.containerTextos}>
        <Text style={styles.textoEspaco}>{nomeEspaco}</Text>
        <Text style={styles.textoLocalizacao}>
          {bairroEspaco}, {cidadeEspaco}
        </Text>
        <Text style={styles.textoPreco}>{preco}/noite</Text>
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
