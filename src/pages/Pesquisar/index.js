import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Text } from "react-native-paper";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../../styles/colors";
import CampoPesquisaFiltro from "../../components/CampoPesquisaFiltro";
import { View } from "react-native";
import { ScrollView } from "react-native";
import ApresentacaoEspaco from "../../components/ApresentacaoEspaco";
import { fetchEspacos } from "../../services/Espacos";
import { formatarMoeda } from "../../utils/funcoes";
import useAuthStore from "../../hooks/useAuthStore";
import useEspacosCurtidos from "../../hooks/useEspacosCurtidos";
import { useNavigation } from "@react-navigation/native";

export default function Pesquisar() {
  const navigation = useNavigation();
  const user = useAuthStore();
  const espacosCurtidos = useEspacosCurtidos();
  const [index, setIndex] = useState(0);
  const [espacos, setEspacos] = useState([]);
  const [routes] = useState([
    { key: "first", title: "Aniversários" },
    { key: "second", title: "Churras" },
    { key: "third", title: "Na piscina" },
    { key: "fourth", title: "Ao ar livre" },
  ]);

  const carregarEspacosCurtidos = async () => {
    try {
      await espacosCurtidos.fetchEspacosCurtidos(Number(user.idUsuario));
    } catch (error) {
      console.error(error);
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

  const renderIcon = (route, focused) => {
    let iconName;

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

  const FirstRoute = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerConteudo}
    >
      <View style={styles.containerApresentacoes}>
        {espacos?.map((espaco, index) => (
          <ApresentacaoEspaco
            key={index}
            carregarEspacosCurtidos={carregarEspacosCurtidos}
            espaco={espaco}
          />
        ))}
      </View>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerConteudo}
    >
      <View style={styles.containerApresentacoes}>
        {espacos?.map((espaco, index) => (
          <ApresentacaoEspaco
            key={index}
            carregarEspacosCurtidos={carregarEspacosCurtidos}
            espaco={espaco}
          />
        ))}
      </View>
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerConteudo}
    >
      <View style={styles.containerApresentacoes}>
        {espacos?.map((espaco, index) => (
          <ApresentacaoEspaco
            key={index}
            carregarEspacosCurtidos={carregarEspacosCurtidos}
            espaco={espaco}
          />
        ))}
      </View>
    </ScrollView>
  );

  const FourthRoute = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerConteudo}
    >
      <View style={styles.containerApresentacoes}>
        {espacos?.map((espaco, index) => (
          <ApresentacaoEspaco
            key={index}
            carregarEspacosCurtidos={carregarEspacosCurtidos}
            espaco={espaco}
          />
        ))}
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

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
      <StatusBar barStyle="light-content" />
      <View style={styles.containerFilter}>
        <CampoPesquisaFiltro
          onPressSearchIcon={() => {}}
          onPressFilterIcon={() => {}}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
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
