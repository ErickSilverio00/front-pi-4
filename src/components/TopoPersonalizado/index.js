import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../styles/colors";

export default function TopoPersonalizado({
  mostrarBotaoVoltar,
  aoPressionarBotaoVoltar,
  mostrarTexto,
  texto,
  mostrarIcones,
  icones,
  aoPressionarIcone,
}) {
  return (
    <View style={styles.containerTopo}>
      <View style={styles.ladoEsquerdo}>
        {mostrarBotaoVoltar && (
          <TouchableOpacity
            onPress={aoPressionarBotaoVoltar}
            style={styles.botaoVoltarTopo}
          >
            <Feather name="arrow-left" size={24} color={colors.corTextoPreto} />
          </TouchableOpacity>
        )}
        {mostrarTexto && <Text style={styles.texto}>{texto}</Text>}
      </View>

      <View style={styles.icones}>
        {mostrarIcones && (
          <View style={styles.iconesContainer}>
            {mostrarIcones && (
              <View style={styles.iconesContainer}>
                {icones.map((Icone, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => aoPressionarIcone(index)}
                    style={[
                      styles.iconeContainer,
                      index !== 0 && { marginLeft: 16 },
                    ]}
                  >
                    <Feather
                      name={Icone}
                      size={24}
                      color={colors.corTextoPreto}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTopo: {
    width: "100%",
    height: 56,
    backgroundColor: colors.branco,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  ladoEsquerdo: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoVoltarTopo: {
    marginRight: 16,
  },
  texto: {
    color: colors.corTextoPreto,
    fontFamily: "Quicksand700",
    fontSize: 16,
  },
  iconesContainer: {
    flexDirection: "row",
  },
});
