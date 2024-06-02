import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import TopoPersonalizado from "../../../components/TopoPersonalizado";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../../styles/colors";
import { servicos } from "../../../utils/opcoesFiltros";
import { getIconComponent } from "../../../utils/importIcons";

export default function Servico() {
  const route = useRoute();
  const { espaco } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TopoPersonalizado
        mostrarBotaoVoltar={true}
        aoPressionarBotaoVoltar={() => navigation.goBack()}
        mostrarTexto={true}
        texto="Serviços"
        mostrarIcones={false}
      />
      <View style={styles.containerConteudo}>
        <Text style={styles.infoText}>
          Os serviços abaixo são opcionais e podem impactar o valor final. Você
          poderá ver o preço de cada serviço quando estiver próximo a finalizar
          sua reserva.
        </Text>
        <View style={styles.buttonsContainer}>
          {espaco?.servicos_adicionais.map((servico) => {
            const { icone, tipoIcone } = servicos[servico.toLowerCase()] || {};
            const IconComponent = getIconComponent(tipoIcone);
            return (
              <Pressable
                key={servico}
                style={[styles.button, { backgroundColor: colors.branco }]}
                onPress={() => {}}
              >
                {icone && tipoIcone && (
                  <IconComponent
                    name={icone}
                    size={20}
                    color={colors.corTextoPreto}
                    type={tipoIcone}
                  />
                )}
                <Text
                  style={{
                    color: colors.corTextoPreto,
                    marginLeft: 5,
                    fontFamily: "Quicksand600",
                  }}
                >
                  {servico}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerConteudo: {
    flex: 1,
    marginHorizontal: 16,
  },
  infoText: {
    fontFamily: "Quicksand600",
    fontSize: 14,
    color: colors.corTextoPreto,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: 15,
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    gap: 4,
    justifyContent: "center",
    //Android
    elevation: 4,
    //IOS
    shadowColor: colors.corTextoPreto,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4.62,
  },
});
