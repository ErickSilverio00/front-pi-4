import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import imagemEspaco from "../../../../assets/imgAnunciante.png";
import { Calendar } from "react-native-calendars";
import colors from "../../../styles/colors";
import CabecalhoTitulo from "../../../components/CabecalhoTitulo";

export default function InfoVendas() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <CabecalhoTitulo titulo="Vamos Festejar!" />
        <View style={styles.spaceInfo}>
          <Image source={imagemEspaco} style={styles.spaceImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.spaceName}>Espaço Glamour</Text>

            <View style={styles.locationContainer}>
              <Icon
                name="map-pin"
                size={22}
                color={colors.roxo700}
                style={styles.iconeLocation}
              />
              <Text style={styles.locationText}>Localização</Text>
            </View>

            <View style={styles.ratingContainer}>
              <AntDesign
                name="star"
                size={22}
                color={colors.amarelo}
                style={styles.iconeEstrela}
              />
              <Text style={styles.ratingText}>4.98</Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTextverde}>Vagas abertas</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: screenWidth }}></View>
        <View style={styles.reserveContainer}>
          <Text style={styles.reserveTitle}>Reserve sua Festa</Text>
          <View style={styles.datesContainer}>
            <View style={styles.leftSection}>
              <Text style={styles.datesLabel}>Datas</Text>
              <Text style={styles.datesText}>7 á 10 de março</Text>
            </View>
            <View style={styles.rightSection}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            current={"2024-06-01"}
            markingType={"multi-dot"}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
            theme={{
              backgroundColor: colors.branco,
              calendarBackground: colors.branco,
              textSectionTitleColor: colors.corTextoPreto,
              selectedDayBackgroundColor: colors.roxo700,
              selectedDayTextColor: colors.branco,
              todayTextColor: colors.roxo700,
              dayTextColor: colors.corTextoPreto,
              textDisabledColor: colors.cinza,
              dotColor: colors.roxo700,
              selectedDotColor: colors.branco,
              arrowColor: colors.roxo700,
              monthTextColor: colors.roxo700,
              indicatorColor: colors.roxo700,
              textDayFontFamily: "Quicksand700",
              textMonthFontFamily: "Quicksand700",
              textDayHeaderFontFamily: "Quicksand700",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
        </View>
        <View style={{ width: screenWidth }}></View>
        <View style={styles.reserveContainer2}>
          <Text style={styles.reserveTitle}>Serviços Adicionais </Text>
          <View style={styles.datesContainer}>
            <View style={styles.leftSection}>
              <Text style={styles.datesLabel}>Serviços</Text>
              <Text style={styles.datesText}>Garçons Bufê</Text>
            </View>
            <View style={styles.rightSection}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.priceInfoContainer}>
          <Text style={styles.priceTitle}>Informações Preço</Text>
          <View style={styles.priceRow}>
            <Text style={styles.pricePerNight}>R$559,00 x 3 noites</Text>
            <Text style={styles.priceTotal}>R$2.795,00</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.pricePerNight}>Preço dos Serviços</Text>
            <Text style={styles.priceTotal}>R$150,00</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.pricePerNight}>Taxa do app Festejar </Text>
            <Text style={styles.priceTotal}>R$300,00</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>R$3.245,00</Text>
          </View>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  container: {
    marginHorizontal: 16,
  },
  spaceImage: {
    width: 135,
    height: 125,
    marginTop: 30,
    borderRadius: 10,
  },
  spaceInfo: {
    flexDirection: "row",
    marginTop: 20,
  },
  infoContainer: {
    marginLeft: 15,
    marginTop: 22,
  },
  spaceName: {
    fontSize: 20,
    fontFamily: "Quicksand700",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    marginLeft: 5,
    fontFamily: "Quicksand700",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontFamily: "Quicksand700",
  },
  button: {
    backgroundColor: colors.branco,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonTextverde: {
    color: colors.verde,
    fontWeight: "bold",
  },
  reserveContainer: {
    marginTop: 20,
  },
  reserveTitle: {
    fontSize: 20,
    fontFamily: "Quicksand700",
    marginBottom: 30,
    textAlign: "center",
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "column",
  },
  datesLabel: {
    fontSize: 16,
    fontFamily: "Quicksand700",
    marginBottom: 5,
  },
  datesText: {
    fontSize: 16,
    fontFamily: "Quicksand700",
    color: colors.cinza,
  },
  rightSection: {
    flexDirection: "column",
  },
  editText: {
    fontSize: 16,
    fontFamily: "Quicksand700",
    color: colors.roxo700,
  },
  customButton: {
    backgroundColor: colors.branco,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.branco,
    marginTop: 40,
  },
  vagasText: {
    color: colors.roxo700,
    fontSize: 16,
    fontFamily: "Quicksand700",
  },
  separatorText: {
    color: colors.corTextoPreto,
    fontSize: 16,
    fontFamily: "Quicksand700",
  },
  horariosText: {
    color: colors.corTextoPreto,
    fontSize: 16,
    fontFamily: "Quicksand400",
  },
  reserveContainer2: {
    marginBottom: 50,
    marginTop: 30,
  },
  priceInfoContainer: {
    marginTop: 20,
  },
  priceTitle: {
    fontSize: 20,
    fontFamily: "Quicksand700",
    marginBottom: 30,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pricePerNight: {
    fontSize: 16,
    fontFamily: "Quicksand700",
    color: colors.cinzaEscuro,
  },
  priceTotal: {
    fontSize: 16,
    fontFamily: "Quicksand700",
  },
  divider: {
    height: 1,
    backgroundColor: colors.cinzaMaisClaro,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontFamily: "Quicksand700",
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: "Quicksand700",
    color: colors.roxo700,
  },
  continueButton: {
    backgroundColor: colors.roxo700,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: colors.branco,
    fontSize: 16,
    fontFamily: "Quicksand700",
  },
});
