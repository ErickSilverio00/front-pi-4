import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text , View } from "react-native";
import colors from "../../styles/colors";
import ApresentacaoEspaco from "../../components/ApresentacaoEspaco";

export default function Curtidos() {
  const [espacosCurtidos,setEspacosCurtidos] = useState([]);

  const carregarEspacosCurtidos = async () => {
    try {
      const espacosDisponiveis = await fetchEspacos();
      setEspacosCurtidos(espacosDisponiveis);
    } catch (error) {
      console.error(error);
    }

  };



  return (
    <SafeAreaView style={styles.container}>
      <HeaderCurtidos/>
      {espacosCurtidos?.map((espaco, index) => (
            <ApresentacaoEspaco
              key={index}
              nomeEspaco={espaco.nome_espaco}
              bairroEspaco={espaco?.endereco?.bairro}
              cidadeEspaco={espaco?.endereco?.cidade}
              preco={formatarMoeda(espaco.valor_diaria)}
              fotos={espaco.imagens_espaco}
            />
          ))}
          
    </SafeAreaView>
  );
}


const HeaderCurtidos = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Curtidos</Text>
      <View style={styles.headerLine} />
    </View>
   
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
    alignItems: 'center', // Apenas centralizar horizontalmente
  },
  headerContainer: {
    width: '100%', // Garantir que o headerContainer tome a largura total
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: colors.branco,
  },
  headerText: {
    fontFamily: 'Quicksand600',
    fontSize: 24,
    color: colors.corTextoPreto,
    marginTop: 10 ,
  },
  headerLine: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.14)', // Cor ajustada conforme solicitado
    width: '80%',
    marginTop: 15,
  },
});