import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import CampoPesquisaFiltro from "../../components/CampoPesquisaFiltro";
import { View } from "react-native";
import { ScrollView } from "react-native";
import ApresentacaoEspaco from "../../components/ApresentacaoEspaco";
import { fetchEspacos } from "../../services/Espacos";
import foto1 from "../../../assets/teste-img/foto1.jpg";
import foto2 from "../../../assets/teste-img/foto2.jpg";
import foto3 from "../../../assets/teste-img/foto3.jpg";

const renderIcon = (route, focused) => {
  let iconName;

  switch (route.key) {
    case "first":
      iconName = "cake";
      break;
    case "second":
      iconName = "restaurant";
      break;
    case "third":
      iconName = "pool";
      break;
    case "fourth":
      iconName = "wb-sunny";
      break;
    default:
      iconName = "cake";
  }

  return (
    <MaterialIcons
      name={iconName}
      size={24}
      color={focused ? colors.primaria : colors.cinzaEscuro}
    />
  );
};

const FirstRoute = () => (
  <SafeAreaView
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerConteudo}
    >
      <View style={styles.containerApresentacoes}>
        <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={[foto1, foto2, foto3]}
        />
        <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={[foto1, foto2, foto3]}
        />
        <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={[foto1, foto2, foto3]}
        />
        {/* <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={
            "https://images.unsplash.com/photo-1536940385103-c729049165e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBhcnR5fGVufDB8fDB8fHww"
          }
        /> */}
      </View>
    </ScrollView>
  </SafeAreaView>
);

const SecondRoute = () => (
  <SafeAreaView
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerConteudo}
    >
      <View style={styles.containerApresentacoes}>
        <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={[foto1, foto2, foto3]}
        />
        <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={[foto1, foto2, foto3]}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const ThirdRoute = () => (
  <SafeAreaView
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerConteudo}
    >
      <View style={styles.containerApresentacoes}>
        <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={[foto1, foto2, foto3]}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const FourthRoute = () => (
  <SafeAreaView
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerConteudo}
    >
      <View style={styles.containerApresentacoes}>
        <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={[foto1, foto2, foto3]}
        />
        <ApresentacaoEspaco
          nomeEspaco={"Espaço Festa"}
          bairroEspaco={"Setor Santa Genoveva"}
          cidadeEspaco={"Goiânia"}
          preco={"R$ 789,90"}
          fotos={[foto1, foto2, foto3]}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

export default function Pesquisar() {
  const [index, setIndex] = useState(0);
  const [espacos, setEspacos] = useState([]);
  const [routes] = useState([
    { key: "first", title: "Aniversários" },
    { key: "second", title: "Churras" },
    { key: "third", title: "Na piscina" },
    { key: "fourth", title: "Ao ar livre" },
  ]);

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

  const carregarEspacos = async () => {
    try {
      const espacosDisponiveis = await fetchEspacos();
      setEspacos(espacosDisponiveis.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   carregarEspacos();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerFilter}>
        <CampoPesquisaFiltro />
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
