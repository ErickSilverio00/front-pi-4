import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native"; // Importe ScrollView aqui
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../styles/colors";
import Svg, { Path } from "react-native-svg";
import Icon from "react-native-vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import imagemEspaco from "../../../../assets/espacoteste.png";
import image1 from "../../../../assets/images 1.png";
import image2 from "../../../../assets/images 2.png";
import image3 from "../../../../assets/image3.png";
import image4 from "../../../../assets/images 4.png";
import image5 from "../../../../assets/Group 8.png";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export default function PaginaEspaco() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Imagem no topo */}
          <Image source={imagemEspaco} style={styles.imagemEspaco} />
          {/* Título */}
          <Text style={styles.title}>Espaço Festa</Text>
          {/* Localização do espaço */}
          <View style={styles.locationContainer}>
            <Icon
              name="map-pin"
              size={22}
              color={colors.roxo700}
              style={styles.iconeLocation}
            />
            <Text style={styles.locationText}>Santa Genoveva, Goiânia, GO</Text>
            {/* Botão "Vagas abertas" */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTextverde}>Vagas abertas</Text>
            </TouchableOpacity>
          </View>
          {/* Classificação do espaço  */}
          <View style={styles.notaEspaco}>
            <AntDesign
              name="star"
              size={22}
              color={colors.amarelo}
              style={styles.iconeEstrela}
            />
            <Text style={styles.ratingText}>4.98</Text>
          </View>
        </View>
        {/* Botões de contato, localização e serviços */}

        <View style={styles.containerBtn}>
          {/* Botão de contato */}
          <TouchableOpacity style={styles.secondaryButton}>
            <Icon
              name="phone"
              size={20}
              color={colors.roxo700}
              style={styles.iconeCurtir}
            />
            <Text style={styles.buttonText}>Contatos</Text>
          </TouchableOpacity>
          {/* Botão de localização */}
          <TouchableOpacity style={styles.secondaryButton}>
            <Icon
              name="map-pin"
              color={colors.roxo700}
              size={20}
              style={styles.iconeCurtir}
            />
            <Text style={styles.buttonText}>Localização</Text>
          </TouchableOpacity>
          {/* Botão de serviços */}
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
        {/* View separada para o novo botão "Vagas - Horários as 10:00 AM" */}
        <View style={styles.vagasHorariosContainer}>
          <TouchableOpacity style={styles.vagasHorariosButton}>
            <Text style={styles.vagasText}>Vagas</Text>
            <Text style={styles.horariosText}> - Horários as 10:00 AM</Text>
          </TouchableOpacity>
        </View>
        {/* View separada para Descrição */}
        <View style={styles.descricaoContainer}>
          <Text style={styles.descricaoTitle}>Descrição</Text>
          <Text numberOfLines={3} style={styles.descricaoText}>
            {/* Texto da descrição limitado a 135 caracteres */}O “Espaço
            Glamour” é o cantinho perfeito para quem busca um lugar charmoso e
            descolado para celebrar momentos especiais...
          </Text>
          {/* Mostrar o botão "Mais Informações" se o texto exceder o limite */}
          <TouchableOpacity style={styles.maisInformacoesButton}>
            <Text style={styles.maisInformacoesButtonText}>
              Mais Informações
            </Text>
          </TouchableOpacity>
        </View>
        {/* Container para os cards */}
        <View style={styles.cardsContainer}>
          {/* Card 1 aniversario */}
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

          {/* Card 2 */}
          <View style={styles.card}>
            <View style={styles.circle}>
              <MaterialIcons
                name="work-outline"
                size={24}
                color={colors.roxo700}
              />
            </View>
            <Text style={styles.cardText}>Corporativo</Text>
          </View>

          {/* Card 3 */}
          <View style={styles.card}>
            <View style={styles.circle}>
              <Feather name="sun" size={24} color={colors.roxo700} />
            </View>
            <Text style={styles.cardText}>Ao ar livre</Text>
          </View>

          {/* Card 4 */}
          <View style={styles.card}>
            <View style={styles.circle}>
              <Entypo name="drink" size={24} color={colors.roxo700} />
            </View>
            <Text style={styles.cardText}>Drink</Text>
          </View>
        </View>
        {/*imagens do espaço 02 */}
        {/* Container para as fotos pequenas */}
        <View style={styles.fotosContainer}>
          <Image source={image1} style={styles.fotoPequena} />
          <Image source={image2} style={styles.fotoPequena} />
          <Image source={image3} style={styles.fotoPequena} />
          <Image source={image4} style={styles.fotoPequena} />
          <Image source={image5} style={styles.fotoPequena} />
        </View>
        {/*Container - preço  */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            <Text style={styles.price}>RS789.00</Text> diária
          </Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Venha festejar!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  imagemEspaco: {
    width: 390,
    height: 250,
  },
  title: {
    fontSize: 24,
    fontFamily: "Quicksand700",
    marginLeft: 20,
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
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 7,
    position: "absolute",
    right: 10,
    borderColor: "rgba(20, 153, 24, 0.68)",
  },
  buttonTextverde: {
    color: "rgba(20, 153, 24, 0.68)",
    fontSize: 15,
    fontFamily: "Quicksand700",
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
    fontSize: 15,
  },
  // botões contato, mapa, serviço
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: colors.roxo700,
    fontFamily: "Quicksand700",
  },
  // Estilos para a nova View do botão "Vagas - Horários as 10:00 AM"
  vagasHorariosContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  vagasHorariosButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
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
    paddingHorizontal: 20,
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 4,
    width: 50,
    height: 90,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
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
  priceContainer:{
backgroundColor: colors.branco ,
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
padding: 20,
marginVertical: 15,
borderRadius: 8,
marginTop:20 , 
  },
  price:{
color:colors.roxo700,
fontFamily: "Quicksand700", 
fontSize:22 , 
},
priceText: {
  fontSize: 18,
  color: 'black',
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
  color: 'white',
  fontSize: 16,
  fontFamily: "Quicksand700",
},
});
