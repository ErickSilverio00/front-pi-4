import React, { useMemo, useRef } from "react";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";

export default function ModalLocalizacao({
  mostrarOpcoesApps,
  setMostrarOpcoesApps,
  endereco,
}) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%"], []);

  const itensApps = [
    {
      name: "google-maps",
      texto: "Google Maps",
    },
    {
      name: "waze",
      texto: "Waze",
    },
  ];

  const aoEscolherApp = (app) => {
    if (app === "waze") {
      Linking.openURL(`https://waze.com/ul?q=${encodeURIComponent(endereco)}`);
    } else if (app === "google-maps") {
      Linking.openURL(
        `http://maps.google.com/maps?daddr=${encodeURIComponent(endereco)}`
      );
    }
  };

  return (
    <Modal
      visible={mostrarOpcoesApps}
      transparent={true}
      animationType="slide"
      onRequestClose={() => [
        setMostrarOpcoesApps(false),
        bottomSheetRef.current?.close(),
      ]}
    >
      <View style={styles.modalFundo}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => [
            setMostrarOpcoesApps(false),
            bottomSheetRef.current?.close(),
          ]}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setMostrarOpcoesApps(false)}
        >
          <View style={styles.modalConteudo}>
            <View style={styles.containerModalConteudo}>
              <Text style={styles.tituloModal}>Abrir com</Text>
              {itensApps.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => aoEscolherApp(item.name)}
                  style={styles.containerBotao}
                >
                  <Icon
                    name={item.name}
                    color={colors.corTextoPreto}
                    size={32}
                  />
                  <Text style={styles.textoBotao}>{item.texto}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </BottomSheet>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalConteudo: {
    backgroundColor: colors.branco,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
  },
  containerModalConteudo: {
    marginTop: 10,
    gap: 20,
  },
  tituloModal: {
    fontFamily: "Quicksand600",
    fontSize: 16,
    color: colors.corTextoPreto,
    textAlign: "center",
  },
  containerBotao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.cinzaMaisClaro,
  },
  textoBotao: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
  },
});
