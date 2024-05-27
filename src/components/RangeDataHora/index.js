import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Feather";

export default function RangeDataHora() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() + 7);
    return initialDate;
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPicker, setCurrentPicker] = useState("start");

  const showDatePicker = (picker) => {
    setCurrentPicker(picker);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    if (currentPicker === "start") {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date
      ? format(date, "dd/MM/yyyy HH:mm", { locale: ptBR })
      : "Não definido";
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.labelDate}>Data Inicial</Text>
        <TouchableOpacity
          style={styles.containerDate}
          onPress={() => showDatePicker("start")}
        >
          <Icon name="calendar" size={22} color={colors.corTextoPreto} />
          <Text style={styles.dateText}>{formatDate(startDate)}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.labelDate}>Data Final</Text>
        <TouchableOpacity
          style={styles.containerDate}
          onPress={() => showDatePicker("end")}
        >
          <Icon name="calendar" size={22} color={colors.corTextoPreto} />
          <Text style={styles.dateText}>{formatDate(endDate)}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={
          currentPicker === "start"
            ? startDate || new Date()
            : endDate || new Date()
        }
        locale="pt-BR"
        headerTextIOS="Escolha uma data e hora"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        textColor={colors.corTextoPreto}
        backgroundColor={colors.branco}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginBottom: 20,
  },
  containerDate: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.cinzaMaisClaro,
    borderRadius: 6,
  },
  labelDate: {
    fontFamily: "Quicksand700",
    fontSize: 16,
    color: colors.corTextoPreto,
    marginBottom: 5,
  },
  dateText: {
    fontFamily: "Quicksand400",
    fontSize: 16,
    color: colors.corTextoPreto,
  },
});
