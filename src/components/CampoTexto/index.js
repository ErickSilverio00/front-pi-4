import React, { forwardRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  interpolateColor,
  useAnimatedStyle,
  Easing,
  interpolate,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Feather";

import useCampoTexto from "../../hooks/useCampoTexto";
import colors from "../../styles/colors";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const CampoTexto = forwardRef(
  (
    {
      label,
      erro,
      mensagemErro,
      onChangeText,
      Icone,
      styleIcone,
      tipo,
      tipoInput,
      mostrarSenha,
      valorInicial,
      aoMudarVisibilidade,
      mostrarLabel = true,
      editable = true,
      ...props
    },
    ref
  ) => {
    const {
      estaFocado,
      texto,
      erroGlobal,
      inputRef,
      mudandoFoco,
      mudandoBlur,
      mudandoTexto,
      labelAnimatedStyle,
      iconeAnimatedStyle,
      inputStyle,
      mudandoContainerPressionado,
    } = useCampoTexto(valorInicial);

    const corIcone = erro
      ? colors.vermelho
      : estaFocado
      ? colors.primaria
      : colors.cinzaEscuro;

    return (
      <TouchableWithoutFeedback onPress={mudandoContainerPressionado}>
        <View
          style={[
            styles.container,
            { marginVertical: valorInicial ? 0 : 0 },
            !editable && styles.disabledContainer,
          ]}
        >
          <AnimatedTextInput
            ref={ref ? ref : inputRef}
            style={[
              styles.input,
              inputStyle,
              { paddingVertical: valorInicial ? 8 : 8 },
              !editable && styles.disabledInput,
            ]}
            onFocus={mudandoFoco}
            onBlur={mudandoBlur}
            value={texto}
            onChangeText={(novoTexto) => {
              mudandoTexto(novoTexto);
              if (onChangeText) {
                onChangeText(novoTexto);
              }
            }}
            keyboardType={tipoInput}
            secureTextEntry={tipo === "senha" && !mostrarSenha}
            editable={editable}
            {...props}
          />
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
          {(erro || erroGlobal) && (
            <Text style={styles.erroTexto}>{mensagemErro}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

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
  disabledContainer: {
    opacity: 0.5,
  },
  disabledInput: {
    color: colors.corTextoPreto,
  },
});

export default CampoTexto;
