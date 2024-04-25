import { useState, useRef } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  Easing,
  runOnJS,
  interpolateColor,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useErro } from "../contexts/ErroCampoTextoContext";
import colors from "../styles/colors";

function useCampoTexto() {
  const [estaFocado, setEstaFocado] = useState(false);
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const posicaoLabel = useSharedValue(estaFocado || texto ? 0 : 1);
  const inputRef = useRef(null);
  const { erroGlobal } = useErro();

  const mudandoFoco = () => {
    setEstaFocado(true);
    posicaoLabel.value = withSpring(0, { damping: 10, stiffness: 120 });
    setErro(false);
  };

  const mudandoBlur = () => {
    setEstaFocado(false);
    if (!texto) {
      posicaoLabel.value = withSpring(1, {
        damping: 10,
        stiffness: 120,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    } else {
      posicaoLabel.value = withSpring(0, {
        damping: 10,
        stiffness: 120,
      });
    }
  };

  const mudandoTexto = (novoTexto) => {
    setTexto(novoTexto);
    posicaoLabel.value = withSpring(estaFocado || novoTexto ? 0 : 1, {
      damping: 10,
      stiffness: 120,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      onRest: () => {
        if (estaFocado || novoTexto) return;
        runOnJS(() => (posicaoLabel.value = 1))();
      },
    });

    setErro(false);
  };

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const top = interpolate(posicaoLabel.value, [0, 1.4], [-10, 20]);
    const fontSize = interpolate(posicaoLabel.value, [0, 1], [12, 16]);
    const corLabel = interpolateColor(
      posicaoLabel.value,
      [0, 1],
      [
        erro || erroGlobal
          ? colors.vermelho
          : estaFocado
          ? colors.primaria
          : colors.cinzaEscuro,
        colors.cinzaEscuro,
      ]
    );
    return {
      top,
      fontSize,
      color: corLabel,
    };
  });

  const iconeAnimatedStyle = useAnimatedStyle(() => {
    const corIcone = interpolateColor(
      posicaoLabel.value,
      [0, 1],
      [
        erro || erroGlobal
          ? colors.vermelho
          : estaFocado
          ? colors.primaria
          : colors.cinzaEscuro,
        colors.cinzaEscuro,
      ]
    );

    const corIconeToggle = mostrarSenha ? colors.cinzaEscuro : corIcone;

    return {
      color: corIconeToggle,
    };
  });

  const corBorderBottom =
    erro || erroGlobal
      ? colors.vermelho
      : estaFocado
      ? colors.primaria
      : colors.cinzaMaisClaro;
  const inputStyle = useAnimatedStyle(() => ({
    borderBottomColor: corBorderBottom,
  }));

  const mudandoContainerPressionado = () => {
    if (!estaFocado) {
      inputRef.current.focus();
    } else {
      Keyboard.dismiss();
      setEstaFocado(false);
      posicaoLabel.value = withSpring(estaFocado || texto ? 0 : 1, {
        damping: 10,
        stiffness: 120,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
  };

  const mudarVisibilidade = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return {
    estaFocado,
    texto,
    erro,
    posicaoLabel,
    inputRef,
    mudandoFoco,
    mudandoBlur,
    mudandoTexto,
    labelAnimatedStyle,
    corBorderBottom,
    iconeAnimatedStyle,
    inputStyle,
    mudandoContainerPressionado,
    mostrarSenha,
    mudarVisibilidade,
  };
}

export default useCampoTexto;
