import React, { useEffect, useState } from "react";
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
import ApresentacaoEspaco from "../../components/ApresentacaoEspaco";
import { fetchEspacosCurtidos } from "../../services/Curtidos";
import { fetchEspacos } from "../../services/Espacos";

export default function Perfil() {
  const navigation = useNavigation();
  const user = useAuthStore();
  const [mostrarConfiguracoes, setMostrarConfiguracoes] = useState(false);
  const [espacos, setEspacos] = useState([]);
  const [espacosCurtidos, setEspacosCurtidos] = useState([]);

  const listaDeIcones = ["menu"];

  const itensConfiguracoes = [
    {
      name: "home",
      texto: "Quero Anunciar Meu Espaço",
      tela: "TornarAnunciante",
    },
    {
      name: "settings",
      texto: "Configurações e Suporte",
      tela: "Configuracoes",
    },
  ];

  const aoPressionarIcone = (index) => {
    if (index === 0) {
      setMostrarConfiguracoes(true);
    }
  };

  const carregarEspacos = async () => {
    try {
      const espacosDisponiveis = await fetchEspacos(
        user.idUsuario ? user.idUsuario : 0
      );
      setEspacos(espacosDisponiveis);
    } catch (error) {
      console.error(error);
    }
  };

  const carregarEspacosCurtidos = async () => {
    try {
      const espacos = await fetchEspacosCurtidos(Number(user.idUsuario));
      setEspacosCurtidos(espacos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      carregarEspacos();
      carregarEspacosCurtidos();
    });

    carregarEspacos();
    carregarEspacosCurtidos();

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!user.isAuthenticated && <Login />}
      {user.isAuthenticated && (
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
              <View style={styles.conteudoCima}>
                <View style={styles.containerFotoPerfil}>
                  <Text style={styles.textoContainerFoto}>
                    {user?.nomeUsuario?.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.textoNomeUsuario}>{user?.nomeUsuario}</Text>
              </View>
              <View style={styles.conteudoBaixo}>
                <View style={styles.containerEspacosJaReservados}>
                  <View style={styles.containerEspacosJaReservadosCima}>
                    <Text style={styles.subtituloContainer}>
                      Espaços que já reservei
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.botaoVerTodos}>Ver todos</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.containerEspacosJaReservadosBaixo}>
                    <View style={styles.containerEspacosJaReservadosBaixo}>
                      {espacos.length > 0 && (
                        <ApresentacaoEspaco
                          key={espacos[0]?.id_espaco}
                          carregarEspacosCurtidos={carregarEspacosCurtidos}
                          espaco={espacos[0]}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.containerEspacosJaReservados}>
                  <View style={styles.containerEspacosJaReservadosCima}>
                    <Text style={styles.subtituloContainer}>
                      Espaços curtidos
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.botaoVerTodos}>Ver todos</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.containerEspacosJaReservadosBaixo}>
                    <View style={styles.containerEspacosJaReservadosBaixo}>
                      {espacosCurtidos.length > 0 && (
                        <ApresentacaoEspaco
                          key={espacos[0]?.id_espaco}
                          carregarEspacosCurtidos={carregarEspacosCurtidos}
                          espaco={espacos[0]}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Modal de opções */}
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
                      onPress={() => [
                        navigation.navigate(item.tela),
                        setMostrarConfiguracoes(false),
                      ]}
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
  conteudoCima: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.primaria,
    height: 200,
  },
  containerFotoPerfil: {
    width: 84,
    height: 84,
    borderRadius: 1000,
    backgroundColor: colors.laranja,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textoContainerFoto: {
    fontFamily: "Quicksand700",
    fontSize: 24,
    color: colors.branco,
  },
  textoNomeUsuario: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.branco,
  },
  conteudoBaixo: {
    marginTop: 16,
    gap: 20,
  },
  containerEspacosJaReservados: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  containerEspacosJaReservadosCima: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  subtituloContainer: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
  },
  botaoVerTodos: {
    fontFamily: "Quicksand600",
    fontSize: 12,
    color: colors.primaria,
  },
  containerEspacosJaReservadosBaixo: {
    display: "flex",
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