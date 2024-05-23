import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import SliderInfoEspaco from "./components/SliderInfoEspaco";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatarMoeda, normalizeKey } from "../../utils/funcoes";
import ModalLocalizacao from "./components/ModalLocalizacao";
import {
  clima,
  jogos,
  situacoes,
  tempo,
  utilidades,
} from "../../utils/opcoesFiltros";
import useEspacosCurtidos from "../../hooks/useEspacosCurtidos";
import useAuthStore from "../../hooks/useAuthStore";
import { fetchEspacosCurtidos } from "../../services/Curtidos";

export default function PaginaEspaco() {
  const route = useRoute();
  const { espaco } = route.params;
  const navigation = useNavigation();
  const user = useAuthStore();
  const espacosCurtidos = useEspacosCurtidos();
  const [curtido, setCurtido] = useState(false);
  const [mostrarOpcoesApps, setMostrarOpcoesApps] = useState(false);

  const blocks = espaco?.imagens_espaco.map((foto) => {
    return { type: "image", content: { uri: foto } };
  });

  const endereco = `${espaco?.endereco?.logradouro}, ${espaco?.endereco?.numero}, ${espaco?.endereco?.bairro}, ${espaco?.endereco?.cidade}, ${espaco?.endereco?.estado}`;

  const renderItensCategorias = (items, config) => {
    return items.map((item) => {
      const normalizedItem = normalizeKey(item);
      const itemConfig = config[normalizedItem];
      const IconComponent = getIconComponent(itemConfig?.tipoIcone);

      return (
        <View style={styles.card} key={item}>
          <View style={styles.circle}>
            <IconComponent
              name={itemConfig?.icone}
              size={22}
              color={colors.primaria}
            />
          </View>
          <Text style={styles.cardText}>{itemConfig?.nome || item}</Text>
        </View>
      );
    });
  };

  const getIconComponent = (tipoIcone) => {
    switch (tipoIcone) {
      case "FontAwesome5":
        return FontAwesome5;
      case "MaterialIcons":
        return MaterialIcons;
      case "MaterialCommunityIcons":
        return MaterialCommunityIcons;
      case "Feather":
        return Feather;
      default:
        return Feather;
    }
  };

  const espacoEstaCurtido = (idEspaco) => {
    return espacosCurtidos.espacosCurtidos.some(
      (espaco) => espaco?.id_espaco === idEspaco
    );
  };

  const findIdEspacoCurtido = (idEspaco) => {
    const espacoCurtido = espacosCurtidos.espacosCurtidos.find(
      (espaco) => espaco?.id_espaco === idEspaco
    );
    return espacoCurtido ? espacoCurtido.id_espaco_curtido : null;
  };

  const aoClicarEmCurtir = async () => {
    try {
      if (!user.isAuthenticated) {
        navigation.navigate("Perfil");
        return;
      }
      if (curtido) {
        const idEspacoCurtido = findIdEspacoCurtido(espaco?.id_espaco);
        await espacosCurtidos.removerEspacoCurtido(idEspacoCurtido);
        setCurtido(false);
      } else {
        const curtidosData = {
          idUsuario: Number(user.idUsuario),
          idEspaco: espaco?.id_espaco,
        };
        await espacosCurtidos.adicionarEspacoCurtido(curtidosData);
        setCurtido(true);
      }
      await carregarEspacosCurtidos(Number(user.idUsuario));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.response.data,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const carregarEspacosCurtidos = async () => {
    try {
      await fetchEspacosCurtidos(Number(user.idUsuario));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCurtido(espacoEstaCurtido(espaco?.id_espaco));
  }, [espaco?.id_espaco]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.containerImagem}>
            <View style={styles.imagemEspaco}>
              <SliderInfoEspaco
                blocks={blocks}
                curtido={curtido}
                setCurtido={setCurtido}
                aoClicarEmCurtir={aoClicarEmCurtir}
                corDotPrimaria={false}
              />
            </View>
          </View>
          <View style={styles.containerInicioEspaco}>
            <View style={styles.containerTituloEspaco}>
              <Text style={styles.title}>{espaco?.nome_espaco}</Text>
              <TouchableOpacity style={styles.notaEspaco}>
                <AntDesign
                  name="star"
                  size={22}
                  color={colors.amarelo}
                  style={styles.iconeEstrela}
                />
                <Text style={styles.ratingText}>4.98</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.locationContainer}>
              <Feather
                name="map-pin"
                size={16}
                color={colors.primaria}
                style={styles.iconeLocation}
              />
              <Text style={styles.locationText}>
                {espaco?.endereco?.bairro}, {espaco?.endereco?.cidade},{" "}
                {espaco?.endereco?.estado}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerBtn}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Feather
              name="phone"
              size={20}
              color={colors.primaria}
              style={styles.iconeCurtir}
            />
            <Text style={styles.buttonText}>Contato</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setMostrarOpcoesApps(true)}
          >
            <Feather
              name="map-pin"
              color={colors.primaria}
              size={20}
              style={styles.iconeCurtir}
            />
            <Text style={styles.buttonText}>Localização</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialIcons
              name="cleaning-services"
              size={20}
              color={colors.primaria}
              style={styles.iconeCurtir}
            />
            <Text style={styles.buttonText}>Serviços</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.vagasHorariosContainer}>
          <TouchableOpacity style={styles.vagasHorariosButton}>
            <Text style={styles.vagasText}>Vagas</Text>
            <Text style={styles.horariosText}> - Horários as 10:00 AM</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descricaoContainer}>
          <Text style={styles.descricaoTitle}>Descrição do espaço</Text>
          <Text style={styles.descricaoText}>{espaco?.descricao}</Text>
        </View>
        {espaco && espaco?.tipo_situacao.length > 0 && (
          <View style={styles.descricaoContainer}>
            <Text style={styles.descricaoTitle}>Situações</Text>
            <View style={styles.cardsContainer}>
              {renderItensCategorias(espaco.tipo_situacao, situacoes)}
            </View>
          </View>
        )}
        {espaco && espaco?.jogos_disponiveis.length > 0 && (
          <View style={styles.descricaoContainer}>
            <Text style={styles.descricaoTitle}>Jogos</Text>
            <View style={styles.cardsContainer}>
              {renderItensCategorias(espaco.jogos_disponiveis, jogos)}
            </View>
          </View>
        )}
        {espaco && espaco?.periodo_ideal.length > 0 && (
          <View style={styles.descricaoContainer}>
            <Text style={styles.descricaoTitle}>Período do dia</Text>
            <View style={styles.cardsContainer}>
              {renderItensCategorias(espaco.periodo_ideal, tempo)}
            </View>
          </View>
        )}
        {espaco && espaco?.clima_ideal.length > 0 && (
          <View style={styles.descricaoContainer}>
            <Text style={styles.descricaoTitle}>Clima Ideal</Text>
            <View style={styles.cardsContainer}>
              {renderItensCategorias(espaco.clima_ideal, clima)}
            </View>
          </View>
        )}
        {espaco && espaco?.utilidades_disponiveis.length > 0 && (
          <View style={styles.descricaoContainer}>
            <Text style={styles.descricaoTitle}>Utilidades</Text>
            <View style={styles.cardsContainer}>
              {renderItensCategorias(espaco.utilidades_disponiveis, utilidades)}
            </View>
          </View>
        )}
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            <Text style={styles.price}>
              {formatarMoeda(espaco?.valor_diaria)}
            </Text>{" "}
            /diária
          </Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Venha festejar!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalLocalizacao
        endereco={endereco}
        mostrarOpcoesApps={mostrarOpcoesApps}
        setMostrarOpcoesApps={setMostrarOpcoesApps}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cinzaMaisClaro,
  },
  content: {
    width: "100%",
    justifyContent: "flex-start",
  },
  containerImagem: {
    position: "relative",
    width: "100%",
  },
  imagemEspaco: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 250,
  },
  containerIconesImagem: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    top: 10,
    paddingHorizontal: 16,
  },
  containerInicioEspaco: {
    display: "flex",
    flexDirection: "column",
  },
  containerTituloEspaco: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Quicksand700",
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    position: "relative",
  },
  locationText: {
    marginLeft: 5,
    fontFamily: "Quicksand400",
  },
  iconeLocation: {
    marginLeft: 16,
  },
  iconeEstrela: {
    marginLeft: 16,
  },
  notaEspaco: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontFamily: "Quicksand700",
    fontSize: 14,
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
  },
  secondaryButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: colors.primaria,
    fontFamily: "Quicksand700",
  },
  vagasHorariosContainer: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
  },
  vagasHorariosButton: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  vagasText: {
    color: colors.primaria,
    fontSize: 15,
    fontFamily: "Quicksand700",
  },
  // Estilos para o texto "Horários as 10:00 AM"
  horariosText: {
    color: "black",
    fontSize: 15,
    fontFamily: "Quicksand400",
  },
  //descrição
  descricaoContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  descricaoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  descricaoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Quicksand700",
    marginBottom: 7,
  },
  descricaoText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Quicksand600",
    color: colors.cinzatxt,
  },
  maisInformacoesButton: {
    alignSelf: "flex-start",
  },
  maisInformacoesButtonText: {
    color: colors.primaria,
    fontFamily: "Quicksand700",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  card: {
    flex: 1,
    maxWidth: 125,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 12,
    color: colors.primaria,
    fontFamily: "Quicksand700",
  },
  //preço
  priceContainer: {
    backgroundColor: colors.branco,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  price: {
    color: colors.primaria,
    fontFamily: "Quicksand700",
    fontSize: 22,
  },
  priceText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Quicksand700",
  },
  //btnpreco
  bookButton: {
    backgroundColor: colors.primaria,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Quicksand700",
  },
});
