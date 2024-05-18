import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native"; // Importe Pressable aqui
import { MaterialIcons } from "@expo/vector-icons";

const CategoriaBotao = ({ nome, icone, marcado, onPress }) => (
  <Pressable // Substitua TouchableOpacity por Pressable
    style={[
      styles.botao,
      { backgroundColor: marcado ? "#B517E2" : "#FFFFFF" },
    ]}
    onPress={onPress}
  >
    <MaterialIcons
      name={icone}
      size={24}
      color={marcado ? "#FFFFFF" : "#B517E2"}
    />
    <Text style={{ color: marcado ? "#FFFFFF" : "#B517E2", marginLeft: 5 }}>
      {nome}
    </Text>
  </Pressable>
);

const Categoria = ({ nome, botoes }) => {
  const [selecionados, setSelecionados] = useState(
    Array(botoes.length).fill(false)
  );

  const toggleSelecionado = (index) => {
    const novosSelecionados = [...selecionados];
    novosSelecionados[index] = !novosSelecionados[index];
    setSelecionados(novosSelecionados);
  };

  return (
    <View style={styles.categoriaContainer}>
      <Text style={styles.categoriaTitulo}>{nome}</Text>
      <View style={styles.botoesContainer}>
        {botoes.map((botao, index) => (
          <CategoriaBotao
            key={index}
            nome={botao.nome}
            icone={botao.icone}
            marcado={selecionados[index]}
            onPress={() => toggleSelecionado(index)}
          />
        ))}
      </View>
    </View>
  );
};

const Pesquisar = () => {
  return (
    <View style={styles.container}>
      <Categoria
        nome="Situações"
        botoes={[
          { nome: "Aniversário", icone: "cake" },
          { nome: "Churrasco", icone: "restaurant" },
          { nome: "Casual", icone: "event" },
          { nome: "Corporativo", icone: "work" },
          { nome: "Automotivo", icone: "directions-car" },
          { nome: "Casamento", icone: "favorite" },
          { nome: "Esportivo", icone: "sports-soccer" },
          { nome: "Formatura", icone: "school" },
          { nome: "Chá revelação", icone: "child-care" },
        ]}
      />
      {/* Restante do seu código Categoria */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoriaContainer: {
    marginBottom: 20,
  },
  categoriaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  botoesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    width: 131,
    height: 31.11,
    borderRadius: 12,
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 10,
  },
});

export default Pesquisar;
