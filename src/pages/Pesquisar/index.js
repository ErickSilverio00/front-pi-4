import React, { useCallback, useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import ApresentacaoEspaco from "../../components/ApresentacaoEspaco";
import {
  fetchEspacoCampoPesquisa,
  fetchEspacos,
  fetchEspacosWithFilters,
} from "../../services/Espacos";
import useAuthStore from "../../hooks/useAuthStore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Filtros from "./Filtros";
import PesquisaFeita from "./PesquisaFeita";
import { useLoading } from "../../contexts/LoadingContext";
import CampoPesquisaFiltro from "../../components/CampoPesquisaFiltro";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import Toast from "react-native-toast-message";

export default function Pesquisar() {
  const navigation = useNavigation();
  const user = useAuthStore();
  const { setIsLoading } = useLoading();
  const [index, setIndex] = useState(0);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [espacos, setEspacos] = useState([]);
  const [espacosFiltrados, setEspacosFiltrados] = useState([]);
  const [textoPesquisa, setTextoPesquisa] = useState("");
  const [pesquisaFeita, setPesquisaFeita] = useState(false);
  const [routes] = useState([
    { key: "first", title: "Aniversários" },
    {
      key: "second",
      title: "Churras",
    },
    { key: "third", title: "Na piscina" },
    { key: "fourth", title: "Ao ar livre" },
  ]);

  const carregarEspacos = useCallback(async () => {
    try {
      const espacosDisponiveis = await fetchEspacos(user.idUsuario || 0);
      setEspacos(espacosDisponiveis);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Erro ao carregar espaços. Tente novamente mais tarde!",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  }, [user.idUsuario]);

  const renderIcon = (route, focused) => {
    let iconName, IconType;

    switch (route.key) {
      case "first":
        iconName = "birthday-cake";
        IconType = FontAwesome5;
        break;
      case "second":
        iconName = "outdoor-grill";
        IconType = MaterialIcons;
        break;
      case "third":
        iconName = "pool";
        IconType = MaterialIcons;
        break;
      case "fourth":
        iconName = "wb-sunny";
        IconType = MaterialIcons;
        break;
      default:
        iconName = "birthday-cake";
        IconType = FontAwesome5;
    }

    return (
      <IconType
        name={iconName}
        size={24}
        color={focused ? colors.primaria : colors.cinzaEscuro}
      />
    );
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.primaria }}
      style={{ backgroundColor: colors.branco }}
      renderIcon={({ route, focused }) => renderIcon(route, focused)}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? colors.primaria : colors.cinzaEscuro,
            fontFamily: "Quicksand600",
            fontSize: 12,
            textAlign: "center",
            paddingTop: 5,
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  const renderScene = useMemo(
    () =>
      SceneMap({
        first: () => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.containerApresentacoes}>
              {espacos
                ?.filter((espaco) =>
                  espaco.tipo_situacao.includes("Aniversário")
                )
                .map((espaco, index) => (
                  <ApresentacaoEspaco key={index} espaco={espaco} />
                ))}
            </View>
          </ScrollView>
        ),
        second: () => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.containerApresentacoes}>
              {espacos
                ?.filter((espaco) => espaco.tipo_situacao.includes("Churrasco"))
                .map((espaco, index) => (
                  <ApresentacaoEspaco key={index} espaco={espaco} />
                ))}
            </View>
          </ScrollView>
        ),
        third: () => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.containerApresentacoes}>
              {espacos
                ?.filter((espaco) =>
                  espaco.utilidades_disponiveis.includes("Piscina")
                )
                .map((espaco, index) => (
                  <ApresentacaoEspaco key={index} espaco={espaco} />
                ))}
            </View>
          </ScrollView>
        ),
        fourth: () => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.containerApresentacoes}>
              {espacos
                ?.filter((espaco) => espaco.clima_ideal.includes("Sol"))
                .map((espaco, index) => (
                  <ApresentacaoEspaco key={index} espaco={espaco} />
                ))}
            </View>
          </ScrollView>
        ),
      }),
    [espacos]
  );

  const handlePesquisaInput = useCallback(async () => {
    if (textoPesquisa.length > 2) {
      const response = await fetchEspacoCampoPesquisa(
        user?.idUsuario,
        textoPesquisa
      );
      setEspacosFiltrados(response);
      setPesquisaFeita(true);
    } else {
      setTextoPesquisa("");
    }
  }, [textoPesquisa, user?.idUsuario]);

  const abrirFiltros = useCallback(() => {
    setMostrarFiltros(true);
  }, []);

  const fecharPesquisa = useCallback(() => {
    setPesquisaFeita(false);
    setTextoPesquisa("");
  }, []);

  const filtrarEspacos = useCallback(
    async (filtros) => {
      try {
        setIsLoading(true);

        if (
          filtros.preco_minimo > 0 &&
          filtros.preco_maximo > 0 &&
          filtros.preco_minimo > filtros.preco_maximo
        ) {
          Toast.show({
            type: "info",
            text1: "Atenção!",
            text2: "Preço mínimo não pode ser maior que o preço máximo",
            visibilityTime: 3000,
            autoHide: true,
          });
          setIsLoading(false);
          return;
        }

        const response = await fetchEspacosWithFilters(
          user?.idUsuario,
          filtros
        );
        setEspacosFiltrados(response);
        setMostrarFiltros(false);
        setPesquisaFeita(true);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: `Erro ao filtrar espaços: ${error}`,
          visibilityTime: 3000,
          autoHide: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [user?.idUsuario, setIsLoading]
  );

  useFocusEffect(
    useCallback(() => {
      carregarEspacos();
    }, [carregarEspacos])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerFilter}>
        <CampoPesquisaFiltro
          onPressSearchIcon={() => {}}
          onPressFilterIcon={abrirFiltros}
          onSubmitEditing={handlePesquisaInput}
          textoPesquisa={textoPesquisa}
          setTextoPesquisa={setTextoPesquisa}
          pesquisaFeita={pesquisaFeita}
          onPressCloseIcon={fecharPesquisa}
        />
      </View>
      {!pesquisaFeita && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      )}
      <Filtros
        mostrarFiltros={mostrarFiltros}
        setMostrarFiltros={setMostrarFiltros}
        filtrarEspacos={filtrarEspacos}
      />
      {pesquisaFeita && (
        <PesquisaFeita
          espacosFiltrados={espacosFiltrados}
          abrirFiltros={abrirFiltros}
          fecharPesquisa={fecharPesquisa}
          textoPesquisa={textoPesquisa}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  containerFilter: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  containerApresentacoes: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginVertical: 20,
  },
});
