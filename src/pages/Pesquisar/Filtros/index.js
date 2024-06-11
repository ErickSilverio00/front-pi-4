// Filtros.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import {
  situacoes,
  jogos,
  periodoDia,
  clima,
  utilidades,
  servicos,
} from "../../../utils/opcoesFiltros";
import colors from "../../../styles/colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import RangeDataHora from "../../../components/RangeDataHora";
import BottomSheet from "@gorhom/bottom-sheet";
import { objectToArray } from "../../../utils/funcoes";

const iconSets = {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Feather,
  Ionicons,
};

const CategoryButton = ({ name, icon, selected, onPress, iconType }) => {
  const IconComponent = iconSets[iconType];
  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: selected ? colors.primaria : colors.branco },
      ]}
      onPress={onPress}
    >
      <IconComponent
        name={icon}
        size={20}
        color={selected ? colors.branco : colors.primaria}
      />
      <Text
        style={{
          color: selected ? colors.branco : colors.primaria,
          marginLeft: 5,
          fontFamily: "Quicksand600",
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

const Category = ({ name, buttons, selectedButtons, toggleSelected }) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryTitle}>{name}</Text>
    <View style={styles.buttonsContainer}>
      {buttons.map((button) => (
        <CategoryButton
          key={button.key}
          name={button.nome}
          icon={button.icone}
          iconType={button.tipoIcone}
          selected={selectedButtons[button.key]}
          onPress={() => toggleSelected(name, button.key)}
        />
      ))}
    </View>
  </View>
);

export default function Filtros({
  bottomSheetRef,
  mostrarFiltros,
  setMostrarFiltros,
  filtrarEspacos,
}) {
  const snapPoints = useMemo(() => ["90%"], []);
  const [values, setValues] = useState([0, 100]);
  const categories = {
    Situações: objectToArray(situacoes),
    Jogos: objectToArray(jogos),
    "Período do Dia": objectToArray(periodoDia),
    Clima: objectToArray(clima),
    Utilidades: objectToArray(utilidades),
    "Serviços Adicionais": objectToArray(servicos),
  };

  const initializeSelectedState = (categories) =>
    Object.keys(categories).reduce((acc, category) => {
      acc[category] = {};
      categories[category].forEach((button) => {
        acc[category][button.key] = false;
      });
      return acc;
    }, {});

  const [selected, setSelected] = useState(initializeSelectedState(categories));

  const toggleSelected = (category, key) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [category]: {
        ...prevSelected[category],
        [key]: !prevSelected[category][key],
      },
    }));
  };

  const limparFiltros = () => {
    setSelected(initializeSelectedState(categories));
  };

  const onValuesChange = (values) => {
    setValues(values);
  };

  const construirFiltros = () => {
    const filtros = {
      situacoes: Object.keys(selected.Situações).filter(
        (key) => selected.Situações[key]
      ),
      jogos: Object.keys(selected.Jogos).filter((key) => selected.Jogos[key]),
      periodo_ideal: Object.keys(selected["Período do Dia"]).filter(
        (key) => selected["Período do Dia"][key]
      ),
      clima_ideal: Object.keys(selected.Clima).filter(
        (key) => selected.Clima[key]
      ),
      utilidades: Object.keys(selected.Utilidades).filter(
        (key) => selected.Utilidades[key]
      ),
      servicos: Object.keys(selected["Serviços Adicionais"]).filter(
        (key) => selected["Serviços Adicionais"][key]
      ),
    };
    return filtros;
  };

  return (
    <Modal
      visible={mostrarFiltros}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setMostrarFiltros(false)}
    >
      <View style={styles.modalFundo}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => setMostrarFiltros(false)}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setMostrarFiltros(false)}
        >
          <View style={styles.modalConteudo}>
            <View style={styles.containerCabecalhoFiltros}>
              <Text style={styles.tituloCabecalho}>Filtros</Text>
              <TouchableOpacity
                onPress={() => [
                  bottomSheetRef.current?.close(),
                  setMostrarFiltros(false),
                ]}
              >
                <iconSets.Feather
                  name="x"
                  size={22}
                  color={colors.corTextoPreto}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <View style={styles.containerSlider}>
                  <Text style={styles.tituloCabecalho}>
                    Distância da sua Localização
                  </Text>
                  <View style={styles.sliderContainer}>
                    <Text style={styles.sliderText}>0 km</Text>
                    <MultiSlider
                      values={values}
                      onValuesChange={onValuesChange}
                      markerStyle={{ width: 24, height: 24 }}
                      selectedStyle={{ backgroundColor: colors.primaria }}
                    />
                    <Text style={styles.sliderText}>100 km</Text>
                  </View>
                </View>
                <View style={styles.containerSlider}>
                  <Text style={styles.tituloCabecalho}>Variação de Preço</Text>
                  <View style={styles.sliderContainer}>
                    <Text style={styles.sliderText}>R$0</Text>
                    <MultiSlider
                      values={values}
                      onValuesChange={onValuesChange}
                      markerStyle={{ width: 24, height: 24 }}
                      selectedStyle={{ backgroundColor: colors.primaria }}
                    />
                    <Text style={styles.sliderText}>R$100</Text>
                  </View>
                </View>
                <RangeDataHora />
                {Object.keys(categories).map((category) => (
                  <Category
                    key={category}
                    name={category}
                    buttons={categories[category]}
                    selectedButtons={selected[category]}
                    toggleSelected={toggleSelected}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.footerButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.footerButton,
                  { backgroundColor: colors.branco },
                ]}
                onPress={limparFiltros}
              >
                <Text
                  style={[styles.footerButtonText, { color: colors.primaria }]}
                >
                  Limpar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerButton}
                onPress={() => filtrarEspacos(construirFiltros())}
              >
                <Text style={styles.footerButtonText}>Filtrar</Text>
              </TouchableOpacity>
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
    paddingBottom: 20,
    height: "100%",
  },
  scrollViewContent: {},
  containerCabecalhoFiltros: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.cinzaMaisClaro,
  },
  tituloCabecalho: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
  },
  content: {
    paddingVertical: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  containerSlider: {
    flexDirection: "column",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sliderText: {
    fontFamily: "Quicksand600",
    fontSize: 12,
    color: colors.corTextoPreto,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
    marginBottom: 10,
    marginHorizontal: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 15,
    marginHorizontal: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexBasis: 140,
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
  footerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.branco,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.primaria,
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
  footerButtonText: {
    fontFamily: "Quicksand600",
    fontSize: 16,
    color: colors.branco,
  },
});
