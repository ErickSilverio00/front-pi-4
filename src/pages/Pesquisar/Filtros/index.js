import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CampoPesquisaFiltro from "../../../components/CampoPesquisaFiltro"; // Certifique-se de que este é o caminho correto




// Componente reutilizável para os botões de cada categoria
const CategoriaBotao = ({ nome, icone, marcado, onPress, iconSet }) => {
  const IconComponent = iconSet || MaterialIcons; // Define o conjunto de ícones padrão
  return (
    <Pressable
      style={[
        styles.botao,
        { backgroundColor: marcado ? "#B517E2" : "#FFFFFF" },
      ]}
      onPress={onPress}
    >
      <IconComponent
        name={icone}
        size={24}
        color={marcado ? "#FFFFFF" : "#B517E2"}
      />
      <Text style={{ color: marcado ? "#FFFFFF" : "#B517E2", marginLeft: 5 }}>
        {nome}
      </Text>
    </Pressable>
  );
};

// Componente para renderizar cada categoria com seus botões
const Categoria = ({ nome, botoes, selecionados, toggleSelecionado }) => {
  return (
    <View style={[styles.categoriaContainer, { alignSelf: 'flex-start' }]}>
      <Text style={styles.categoriaTitulo}>{nome}</Text>
      <View style={styles.botoesContainer}>
        {botoes.map((botao, index) => (
          <CategoriaBotao
            key={index}
            nome={botao.nome}
            icone={botao.icone}
            marcado={selecionados[index]}
            onPress={() => toggleSelecionado(nome, index)}
            iconSet={botao.iconSet} // Passa o conjunto de ícones correto
          />
        ))}
      </View>
    </View>
  );
};

// Componente principal que renderiza todas as categorias com seus botões
const Filtros = () => {
  const categoriasInicial = {
    "Situações": [
      { nome: "Aniversário", icone: "cake" },
      { nome: "Churrasco", icone: "restaurant" },
      { nome: "Casual", icone: "event" },
      { nome: "Corporativo", icone: "work" },
      { nome: "Automotivo", icone: "directions-car" },
      { nome: "Casamento", icone: "favorite" },
      { nome: "Esportivo", icone: "sports-soccer" },
      { nome: "Formatura", icone: "school" },
      { nome: "Chá revelação", icone: "child-care" },
    ],
    "Jogos": [
      { nome: "Sinuca", icone: "billiards", iconSet: MaterialCommunityIcons },
      { nome: "Ping Pong", icone: "table-tennis", iconSet: FontAwesome6 },
      { nome: "Pebolim", icone: "gamepad" },
      { nome: "Fliperama", icone: "gamepad-variant", iconSet: MaterialCommunityIcons },
      { nome: "Vídeo Game", icone: "videogame-asset" },
      { nome: "Karaokê", icone: "mic" },
      { nome: "Brinquedoteca", icone: "toys" },
    ],
    "Tempo": [
      { nome: "De manhã", icone: "wb-sunny" },
      { nome: "A tarde", icone: "sun", iconSet: Feather },
      { nome: "A noite", icone: "nights-stay" },
    ],
    "Clima": [
      { nome: "Sol", icone: "wb-sunny" },
      { nome: "Chuva", icone: "umbrella" },
    ],
    "Não Possuir": [
      { nome: "Piscina", icone: "pool" },
      { nome: "Quadra", icone: "sports-basketball" },
      { nome: "Freezer", icone: "ac-unit" },
      { nome: "Geladeira", icone: "kitchen" },
      { nome: "Churrasqueira", icone: "whatshot" },
      { nome: "Fogão", icone: "local-fire-department" },
      { nome: "Cozinha (em geral)", icone: "restaurant-menu" },
      { nome: "Som", icone: "music-note" },
      { nome: "Mesas", icone: "table-chart" },
      { nome: "Cadeiras", icone: "event-seat" },
      { nome: "Talheres, pratos", icone: "dinner-dining" },
      { nome: "Banheiro", icone: "bathtub" },
      { nome: "Ar condicionado", icone: "ac-unit" },
      { nome: "Estacionamento", icone: "local-parking" },
    ],
    "Serviços Adicionais": [
      { nome: "Limpeza pós festa", icone: "cleaning-services" },
      { nome: "Garçons", icone: "emoji-people" },
      { nome: "Cozinheiros", icone: "restaurant" },
    ],
  };

  const [selecionados, setSelecionados] = useState(
    Object.keys(categoriasInicial).reduce((acc, categoria) => {
      acc[categoria] = Array(categoriasInicial[categoria].length).fill(false);
      return acc;
    }, {})
  );

  const toggleSelecionado = (categoria, index) => {
    const novosSelecionados = { ...selecionados };
    novosSelecionados[categoria][index] = !novosSelecionados[categoria][index];
    setSelecionados(novosSelecionados);
  };

  const limparFiltros = () => {
    const novosSelecionados = Object.keys(selecionados).reduce((acc, categoria) => {
      acc[categoria] = Array(selecionados[categoria].length).fill(false);
      return acc;
    }, {});
    setSelecionados(novosSelecionados);
  };

  const mostrarMaisLugares = () => {
    // Implementar lógica para mostrar mais lugares
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.containerFilter}>
        <CampoPesquisaFiltro onPressSearchIcon={() => {}} onPressFilterIcon={() => {}} />
      </View>

      {Object.keys(categoriasInicial).map((categoria, index) => (
        <Categoria
          key={index}
          nome={categoria}
          botoes={categoriasInicial[categoria]}
          selecionados={selecionados[categoria]}
          toggleSelecionado={toggleSelecionado}
        />
      ))}

      {/* Botões de rodapé */}
      <View style={styles.botoesFooterContainer}>
        <Pressable style={styles.botaoFooter} onPress={limparFiltros}>
          <Text style={styles.botaoFooterText}>Limpar Filtros</Text>
        </Pressable>
        <Pressable style={styles.botaoFooter} onPress={mostrarMaisLugares}>
          <Text style={styles.botaoFooterText}>Mostrar Mais Lugares</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerFilter: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
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
  botoesFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20, // Adiciona margem para afastar dos cantos
  },
  botaoFooter: {
    backgroundColor: '#B517E2',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10, // Adiciona margem horizontal para afastar do centro
  },
  botaoFooterText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});


const limparFiltrosos = () => {
  const categoriasInicial = {
    "Situações": [
      // Definição dos botões de cada categoria
    ],
    // Definição das outras categorias
  };

  // Estado para controlar os botões selecionados em cada categoria
  const [selecionados, setSelecionados] = useState(
    Object.keys(categoriasInicial).reduce((acc, categoria) => {
      acc[categoria] = Array(categoriasInicial[categoria].length).fill(false);
      return acc;
    }, {})
  );

  // Função para alternar o estado marcado/desmarcado de um botão em uma categoria
  const toggleSelecionado = (categoria, index) => {
    const novosSelecionados = { ...selecionados };
    novosSelecionados[categoria][index] = !novosSelecionados[categoria][index];
    setSelecionados(novosSelecionados);
  };

  // Função para limpar todos os filtros
  const limparFiltros = () => {
    const novosSelecionados = Object.keys(selecionados).reduce((acc, categoria) => {
      acc[categoria] = Array(selecionados[categoria].length).fill(false);
      return acc;
    }, {});
    setSelecionados(novosSelecionados);
  };

  // Função para mostrar mais lugares
  const mostrarMaisLugares = () => {
    // Implementar a lógica para mostrar mais lugares
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.containerFilter}>
        <CampoPesquisaFiltro onPressSearchIcon={(Filtros) => {navigator}} onPressFilterIcon={() => {}} />
      </View>

      {/* Renderização das categorias */}
      {Object.keys(categoriasInicial).map((categoria, index) => (
        <Categoria
          key={index}
          nome={categoria}
          botoes={categoriasInicial[categoria]}
          selecionados={selecionados[categoria]}
          toggleSelecionado={toggleSelecionado}
        />
      ))}

      {/* Botões de rodapé */}
      <View style={styles.botoesFooterContainer}>
        <Pressable style={styles.botaoFooter} onPress={limparFiltros}>
          <Text style={styles.botaoFooterText}>Limpar Filtros</Text>
        </Pressable>
        <Pressable style={styles.botaoFooter} onPress={mostrarMaisLugares}>
          <Text style={styles.botaoFooterText}>Mostrar Mais Lugares</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Filtros;