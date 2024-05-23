import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import CampoPesquisa from "../../components/CampoPesquisa";
import colors from "../../styles/colors";
import { removerAcentos } from "../../utils/funcoes";
import CabecalhoTitulo from "../../components/CabecalhoTitulo";

export default function Mensagens() {
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "João",
      image:
        "https://i.pinimg.com/originals/35/46/16/354616b397e95443285b8a4b111f1100.jpg",
      message: "Olá, como você está?",
      newMessage: true,
    },
    {
      id: 2,
      name: "Maria",
      image:
        "https://i.pinimg.com/originals/35/46/16/354616b397e95443285b8a4b111f1100.jpg",
      message: "Tudo bem, obrigado!",
      newMessage: false,
    },
  ]);

  const [filteredMessages, setFilteredMessages] = useState(messages);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const normalizedSearch = removerAcentos(text.toLowerCase());

    const filtered = messages.filter((message) => {
      const normalizedMessage = removerAcentos(message.name.toLowerCase());
      return normalizedMessage.includes(normalizedSearch);
    });

    setFilteredMessages(filtered);
  };

  return (
    <SafeAreaView style={styles.conteudoGeral}>
      <CabecalhoTitulo titulo="Mensagens" />
      <View style={styles.containerPesquisaUsuario}>
        <CampoPesquisa onChange={handleSearch} />
      </View>
      <FlatList
        data={filteredMessages}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.estiloMensagem}>
            <View style={styles.barraMensagem}>
              <View style={styles.barraMensagemEsquerdo}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.imgUsuarioMensagem}
                />
                <View style={styles.barraMensagemControle}>
                  <Text style={styles.barraNomeUsuario}>{item.name}</Text>
                  <Text style={styles.barraMensagemUsuario}>
                    {item.message}
                  </Text>
                </View>
              </View>
              {item.newMessage && <View style={styles.statusNotificacao} />}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteudoGeral: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerPesquisaUsuario: { marginTop: 20, marginHorizontal: 16 },
  estiloMensagem: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  barraMensagem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barraMensagemEsquerdo: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  imgUsuarioMensagem: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  barraNomeUsuario: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    fontWeight: "bold",
  },
  barraMensagemUsuario: {
    fontFamily: "Quicksand400",
    fontSize: 14,
    color: "#666",
  },
  statusNotificacao: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.primaria,
  },
});
