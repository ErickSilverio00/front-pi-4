import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView } from "react-native";
import colors from "../../../../styles/colors";
import CabecalhoTitulo from "../../../../components/CabecalhoTitulo";
import CampoTexto from "../../../../components/CampoTexto";
import Botao from "../../../../components/Botao";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const CadastrarEspacoDeFesta = () => {
  const navigation = useNavigation();
  const [nomeEspaco, setNomeEspaco] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [cep, setCep] = useState('');
  const [descricao, setDescricao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [capacidade, setCapacidade] = useState('50');

  const handleCadastro = () => {
    // Lógica para cadastrar o espaço de festa
    // Exemplo de uso de Toast para notificação
    Toast.show({
      type: 'success',
      text1: 'Espaço cadastrado com sucesso!'
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CabecalhoTitulo titulo="Cadastrar Espaço de Festa" />
      <CampoTexto
        placeholder="Nome do Espaço"
        value={nomeEspaco}
        onChangeText={setNomeEspaco}
      />
      <CampoTexto
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />
      <View style={styles.row}>
        <CampoTexto
          placeholder="CEP"
          value={cep}
          onChangeText={setCep}
          style={styles.cep}
        />
        <View style={styles.capacidadeContainer}>
          <Text style={styles.capacidadeLabel}>Capacidade:</Text>
          <TextInput
            style={styles.capacidadeInput}
            value={capacidade}
            onChangeText={setCapacidade}
            keyboardType="numeric"
          />
        </View>
      </View>
      <CampoTexto
        placeholder="Descrição do Espaço"
        value={descricao}
        onChangeText={setDescricao}
      />
      <CampoTexto
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <Text style={styles.adicionarFoto}>Adicionar foto</Text>
      <View style={styles.fotoContainer}>
        <TouchableOpacity style={styles.fotoPlaceholder}>
          <Image source={require('../../../../assets/placeholder.png')} style={styles.foto} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fotoPlaceholder}>
          <Image source={require('../../../../assets/placeholder.png')} style={styles.foto} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fotoPlaceholder}>
          <Image source={require('../../../../assets/placeholder.png')} style={styles.foto} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fotoPlaceholder}>
          <Image source={require('../../../../assets/placeholder.png')} style={styles.foto} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fotoPlaceholder}>
          <Image source={require('../../../../assets/placeholder.png')} style={styles.foto} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Botao title="Apagar" onPress={() => console.log('Apagar')} style={styles.botaoApagar} />
        <Botao title="Continuar" onPress={handleCadastro} style={styles.botaoContinuar} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cep: {
    flex: 1,
  },
  capacidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  capacidadeLabel: {
    marginRight: 8,
  },
  capacidadeInput: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    width: 60,
    textAlign: 'center',
  },
  adicionarFoto: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  fotoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fotoPlaceholder: {
    width: '30%',
    height: 100,
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  foto: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  botaoApagar: {
    backgroundColor: colors.red,
  },
  botaoContinuar: {
    backgroundColor: colors.purple,
  },
});

export default CadastrarEspacoDeFesta;
