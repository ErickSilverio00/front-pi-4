import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../styles/colors";
import useAuthStore from "../../hooks/useAuthStore";
import Login from "./FluxoDeAutenticacao/Login";
import TopoPersonalizado from "../../components/TopoPersonalizado";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Botao from "../../components/Botao";

export default function Perfil() {
  const navigation = useNavigation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mostrarConfiguracoes, setMostrarConfiguracoes] = useState(false);

  const listaDeIcones = ["menu"];

  const itensConfiguracoes = [
    { name: "settings", texto: "Configurações e Suporte" },
  ];

  const aoPressionarIcone = (index) => {
    if (index === 0) {
      setMostrarConfiguracoes(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isAuthenticated && <Login />}
      {isAuthenticated && (
        <>
          <TopoPersonalizado
            mostrarBotaoVoltar={false}
            mostrarTexto={true}
            texto="Meu Perfil"
            mostrarIcones={true}
            icones={listaDeIcones}
            aoPressionarIcone={aoPressionarIcone}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.conteudoGeral}>
              <View style={styles.containerBotaoEditarPerfil}>
                <Botao
                  // aoPressionarBotao={() => {
                  //   navigation.navigate("Login");
                  // }}
                  texto="Editar Perfil"
                  style={styles.botaoEditarPerfil}
                />
              </View>
            </View>
          </ScrollView>
          <Modal
            visible={mostrarConfiguracoes}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setMostrarConfiguracoes(false)}
          >
            <View style={styles.modalFundo}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => setMostrarConfiguracoes(false)}
              />
              <View style={styles.modalConteudo}>
                <View style={styles.containerModalConteudo}>
                  {itensConfiguracoes.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => navigation.navigate(index)}
                      style={styles.containerBotao}
                    >
                      <Icon
                        name={item.name}
                        color={colors.corTextoPreto}
                        size={32}
                      />
                      <Text style={styles.textoBotao}>{item.texto}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.branco,
    flex: 1,
  },
  conteudoGeral: {
    marginHorizontal: 16,
  },
  containerBotaoEditarPerfil: {
    marginTop: 30,
    //Android
    elevation: 4,
    //IOS
    shadowColor: colors.preto,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  botaoEditarPerfil: {
    backgroundColor: colors.primaria,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Quicksand700",
    color: colors.branco,
    fontSize: 14,
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalConteudo: {
    backgroundColor: colors.branco,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  containerModalConteudo: {
    marginTop: 10,
    gap: 20,
  },
  containerBotao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.cinzaMaisClaro,
  },
  textoBotao: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
  },
});
