// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, FlatList } from 'react-native';


// const ChatScreen = () => {
//   const [mensagens, setMensagens] = useState([]);
//   const [mensagem, setMensagem] = useState('');

//   const enviarMensagem = () => {
//     if (mensagem.trim() === '') return;
//     const novaMensagem = { texto: mensagem, remetente: 'eu', id: mensagens.length + 1 };
//     setMensagens([...mensagens, novaMensagem]);
//     setMensagem('');
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.containerA}>
//       <Text style={styles.containerZ}>
//         {item.texto}
//       </Text>
//     </View>
//   );

//   return (

//     <View style={styles.corFundo }>

//       <FlatList
//         data={mensagens}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//       />
//       <View style={styles.containerB}>
//         <TextInput
//           style={styles.containerC}
//           placeholder="Digite sua mensagem..."
//           value={mensagem}
//           onChangeText={text => setMensagem(text)}
//         />
//         <Button title="Enviar" onPress={enviarMensagem} />
//       </View>
//       </View>
//   );
// }
//   const styles = StyleSheet.create({
  
//       //Cor de fundo da tela
//   corFundo: {
//     flex: 1,
//    backgroundColor: "#fff"
//   },
//   //Deixarei para documentar assim que estiver com as funcionalidades A
//     //antes do return
//   containerZ: {
//                  padding: 10,
//                  alignSelf: item.remetente === 'eu' ? 'flex-end' : 'flex-start' 
//   }, 
//     //Deixarei para documentar assim que estiver com as funcionalidades A
//   //antes do return
//   containerA: { 
//                  backgroundColor: item.remetente === 'eu' ? '#DCF8C6' : '#E5E5EA',
//                  padding: 10,
//                  borderRadius: 8 },

//   //Deixarei para documentar assim que estiver com as funcionalidades B
//   containerB:{ flexDirection: 'row',
//                alignItems: 'center',
//                padding: 10 },

//   //Responsavel pela barra de escrita do usuario.
//   containerC: {
//                 flex: 1,
//                 marginRight: 10,
//                 borderWidth: 1,
//                 borderColor: '#ccc',
//                 borderRadius: 8,
//                 padding: 10 },
//   });

  
// export default ChatScreen;