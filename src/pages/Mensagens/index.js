import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconImagem, { IconImagem} from "../../../assets/augustoanunciante.png"

const MessagesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "João",
      image: "https://example.com/joao.jpg",
      message: "Olá, como você está?",
      newMessage: true,
    },
    {
      id: 2,
      name: "Maria",
      image: "https://example.com/maria.jpg",
      message: "Tudo bem, obrigado!",
      newMessage: false,
    },
    //...
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredMessages = messages.filter((message) =>
      message.name.toLowerCase().includes(text.toLowerCase())
    );
    setMessages(filteredMessages);
  };
  /*
// Efeito para carregar as mensagens do servidor ao montar o componente
useEffect(() => {
  axios.get('https://your-api-url.com/messages') // URL da sua API
    .then(response => {
      setMessages(response.data);
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
}, []);
*/

  return (
   
    <View style={styles.corFundo }>
      <View
        style={ styles.cabecalhoMensagem}
      >
        <Text style={styles.titulo}>Mensagens</Text>
        <Ionicons name="ios-chatbox" size={24} color="#333" />
      </View>
      <View style={styles.rodapePesquisa}>
        <TextInput
          style={styles.barraPesquisa}

          placeholder="Buscar usuário"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.estiloMensagem}
          >
            <View style={styles.barraMensagemD}>
              <Image
               source={{ uri: item.image }}
               
                style={styles.imgUsuarioMensagem}
              />
              <View style={styles.barraMensagemControle}>
                <Text style={styles.barraNomeUsuario}>
                  {item.name}
                </Text>
                <Text style={styles.barraMensagemUsuario}>
                  {item.message}
                </Text>
              </View>
              {item.newMessage && (
                <View
                  style={styles.statusNotificacao}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({

   //Cor de fundo da tela
  corFundo: {
               flex: 1,
              backgroundColor: "#fff"
             },

  //Cabeçalho no top da tela, responsavel pelo nome exibido "Mensagem", e o icone de msn
  cabecalhoMensagem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  //Responsavel pelo titulo "MENSAGEM"da tela ...
  titulo: { fontSize: 18,
             fontWeight: 'bold'
             },

   // Rodapé de pesquisa aonde fica o background da barra pesquisa.
  rodapePesquisa:
   { padding: 16,
     backgroundColor: "#f7",
       },
  //Barra de pesquisa, aonde fica todo o design da barra de pesquisa 
   barraPesquisa:{
            height: 40,
            borderColor: "#3c3c",//teste cor MUDAR PAR 3c3c3c
            borderRadius: 20,
            borderWidth: 1,
            paddingHorizontal: 16,
              //Android
             elevation: 4,
              shadowOpacity: 0.23,
              shadowRadius: 4.62,
          },
 // aqui fica o layout das novas mensagens a receber
    estiloMensagem:
    {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
 // =======================
 //responsavel aonde ficara a lista das mensagens,parte do usuario msn ex: joão e maria
    barraMensagem:
    { flexDirection: "row",
      alignItems: "center" },
     // =======================
     //responsavel por puxar a imagem do usuario, a borda redonda, ex: circulo Redondo icone.
     imgUsuarioMensagem:
     { 
       width: 40,
       height: 40,
       borderRadius: 20 },
  // =======================
  //Responsavel pela barra de mensagem a partir do icone de imagem do usuario | tudo em um container para referenciar o usuario completo
  //referente a regra acima
      barraMensagemControle:
     { marginLeft: 16 },
 // =======================
    //Responsavel pela borda do nome do usuario, que esta mandando a mensagem
      barraNomeUsuario:
      { fontSize: 16,
        fontWeight: "bold" },
  // =======================
      // Responsavel pela barra da mensagem que o usuario enviou, somente a barra em questão
    barraMensagemUsuario:
    { 
      fontSize: 14,
      color: "#666" },
  // =======================   
      //Notificação de mensagem Nova - uma bolinha ira aparecer a nova mensagem referenciando não visualizada
    statusNotificacao:
    {
  
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#ff69b4",
      position: "absolute",
      top: 0,
      right: 0,
    },
// =======================

});

export default MessagesScreen;
