import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SliderInfoEspaco from "./components/SliderInfoEspaco";
import { useRoute } from "@react-navigation/native";
import { formatarMoeda } from "../../utils/funcoes";
import ModalLocalizacao from "./components/ModalLocalizacao";

export default function PaginaEspaco() {
  const route = useRoute();
  const { espaco } = route.params;
  const [curtido, setCurtido] = useState(false);
  const [mostrarOpcoesApps, setMostrarOpcoesApps] = useState(false);

  const fotos = espaco?.imagens_espaco || [];

  const blocks = fotos.map((foto) => {
    return { type: "image", content: { uri: foto } };
  });

  const endereco = `${espaco?.endereco?.logradouro}, ${espaco?.endereco?.numero}, ${espaco?.endereco?.bairro}, ${espaco?.endereco?.cidade}, ${espaco?.endereco?.estado}`;
  // const endereco = espaco?.nome_espaco;

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
                aoClicarEmCurtir={() => {}}
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
              <Icon
                name="map-pin"
                size={16}
                color={colors.roxo700}
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
            <Icon
              name="phone"
              size={20}
              color={colors.roxo700}
              style={styles.iconeCurtir}
            />
            <Text style={styles.buttonText}>Contato</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setMostrarOpcoesApps(true)}
          >
            <Icon
              name="map-pin"
              color={colors.roxo700}
              size={20}
              style={styles.iconeCurtir}
            />
            <Text style={styles.buttonText}>Localização</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialIcons
              name="cleaning-services"
              size={20}
              color={colors.roxo700}
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
          <Text numberOfLines={3} style={styles.descricaoText}>
            {espaco?.descricao}
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.circle}>
              <FontAwesome
                name="birthday-cake"
                size={22}
                color={colors.roxo700}
              />
            </View>
            <Text style={styles.cardText}>Aniversário</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.circle}>
              <MaterialIcons
                name="work-outline"
                size={22}
                color={colors.roxo700}
              />
            </View>
            <Text style={styles.cardText}>Corporativo</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.circle}>
              <Feather name="sun" size={22} color={colors.roxo700} />
            </View>
            <Text style={styles.cardText}>Ao ar livre</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.circle}>
              <Entypo name="drink" size={22} color={colors.roxo700} />
            </View>
            <Text style={styles.cardText}>Drink</Text>
          </View>
        </View>
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
    color: colors.roxo700,
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
    color: colors.roxo700,
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
    color: colors.roxo700,
    fontFamily: "Quicksand700",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
    color: colors.roxo700,
    fontFamily: "Quicksand700",
  },
  // fotos do espaço
  fotosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },
  fotoPequena: {
    width: 69,
    height: 70,
    marginBottom: 10,
    // preço
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
    color: colors.roxo700,
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
    backgroundColor: colors.roxo700,
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
