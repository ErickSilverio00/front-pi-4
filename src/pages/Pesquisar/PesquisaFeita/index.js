import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../../styles/colors";
import useAuthStore from "../../../hooks/useAuthStore";
import useEspacosCurtidos from "../../../hooks/useEspacosCurtidos";
import ApresentacaoEspaco from "../../../components/ApresentacaoEspaco";
import { useLoading } from "../../../contexts/LoadingContext";

export default function PesquisaFeita({
  abrirFiltros,
  fecharPesquisa,
  espacosFiltrados,
  textoPesquisa,
}) {
  const user = useAuthStore();
  const espacosCurtidos = useEspacosCurtidos();
  const [texto, setTexto] = useState(textoPesquisa);
  const { setIsLoading } = useLoading();

  const carregarEspacosCurtidos = useCallback(async () => {
    try {
      setIsLoading(true);
      await espacosCurtidos.fetchEspacosCurtidos(Number(user.idUsuario));
    } catch (error) {
      console.error("Erro ao carregar espaços curtidos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [espacosCurtidos, user.idUsuario]);

  useEffect(() => {
    carregarEspacosCurtidos();
  }, []);

  useEffect(() => {
    setTexto(textoPesquisa);
  }, [textoPesquisa]);

  return (
    <>
      <View style={styles.containerCampoPesquisa}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={colors.corTextoPreto}
          onChangeText={(texto) => setTexto(texto)}
          value={texto}
        />
        <View style={styles.containerIcones}>
          <TouchableOpacity onPress={abrirFiltros}>
            <Feather name="sliders" size={24} color={colors.branco} />
          </TouchableOpacity>
          <TouchableOpacity onPress={fecharPesquisa}>
            <Feather name="x" size={24} color={colors.branco} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerApresentacoes}>
          {espacosFiltrados.map((espaco, index) => (
            <ApresentacaoEspaco
              key={index}
              carregarEspacosCurtidos={carregarEspacosCurtidos}
              espaco={espaco}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerCampoPesquisa: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.primaria,
  },
  textInput: {
    display: "flex",
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.preto,
    backgroundColor: "#fdf3ff",
    padding: 8,
    borderRadius: 6,
    width: "80%",
  },
  containerIcones: {
    flexDirection: "row",
    gap: 10,
  },
  containerApresentacoes: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 20,
    gap: 20,
  },
});
