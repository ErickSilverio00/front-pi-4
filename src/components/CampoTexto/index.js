import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Animated from "react-native-reanimated";
import useCampoTexto from "../../hooks/useCampoTexto";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Feather";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function CampoTexto({
  label,
  erro,
  mensagemErro,
  onChangeText,
  Icone,
  styleIcone,
  tipo,
  mostrarSenha,
  valorInicial,
  aoMudarVisibilidade,
  mostrarLabel = true,
}) {
  const {
    estaFocado,
    texto,
    posicaoLabel,
    erroGlobal,
    inputRef,
    mudandoFoco,
    mudandoBlur,
    mudandoTexto,
    labelAnimatedStyle,
    iconeAnimatedStyle,
    inputStyle,
    mudandoContainerPressionado,
  } = useCampoTexto();

  const corIcone = erro
    ? colors.vermelho
    : estaFocado
    ? colors.primaria
    : colors.cinzaEscuro;

  return (
    <TouchableWithoutFeedback onPress={mudandoContainerPressionado}>
      <View
        style={[styles.container, { marginVertical: valorInicial ? 0 : 0 }]}
      >
        <AnimatedTextInput
          ref={inputRef}
          style={[
            styles.input,
            inputStyle,
            { paddingVertical: valorInicial ? 8 : 8 },
          ]}
          onFocus={mudandoFoco}
          onBlur={mudandoBlur}
          value={texto || valorInicial}
          onChangeText={(novoTexto) => {
            mudandoTexto(novoTexto);
            if (onChangeText) {
              onChangeText(novoTexto);
            }
          }}
          secureTextEntry={tipo === "senha" && !mostrarSenha}
        />
        {tipo === "senha" && (
          <TouchableWithoutFeedback onPress={aoMudarVisibilidade}>
            <Animated.View style={[styles.iconContainer, iconeAnimatedStyle]}>
              <Icon
                size={20}
                name={Icone}
                style={[styleIcone, { color: corIcone }]}
                onPress={() => {
                  aoMudarVisibilidade(!mostrarSenha);
                }}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
        {mostrarLabel && (
          <Animated.Text
            style={[
              styles.label,
              labelAnimatedStyle,
              erro && styles.labelErro,
              estaFocado && !erro && styles.labelFocado,
            ]}
          >
            {label}
          </Animated.Text>
        )}
        {(erro || erroGlobal) && (
          <Text style={styles.erroTexto}>{mensagemErro}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: "Quicksand400",
  },
  label: {
    position: "absolute",
    fontFamily: "Quicksand400",
  },
  labelErro: {
    color: colors.vermelho,
  },
  labelFocado: {
    color: colors.primaria,
  },
  erroTexto: {
    color: colors.vermelho,
    marginTop: 5,
    fontSize: 12,
    fontFamily: "Quicksand400",
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 20,
  },
});
