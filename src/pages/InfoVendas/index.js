import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { AntDesign } from '@expo/vector-icons';
import colors from "../../styles/colors";
import imagemEspaco from "../../../assets/espacoteste.png";
import { Calendar, Agenda } from 'react-native-calendars';


export default function FestejarScreen() {
  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      {/* Título alinhado ao centro */}
      <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Vamos Feste<Text style={styles.highlight}>Jar</Text>!</Text>
      </View>

      {/* Imagem e Nome do Espaço */}
      <View style={styles.spaceInfo}>
        <Image source={imagemEspaco} style={styles.spaceImage} />
        
        {/* Outros elementos de informação do espaço */}
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
      {/* Retângulo cinza */}
      <View style={[styles.retangulo, { width: screenWidth }]}></View>
      
      {/* Nova View com o título e outras informações */}
      <View style={styles.reserveContainer}>
        <Text style={styles.reserveTitle}>Reserve sua Festa</Text>
        <View style={styles.datesContainer}>
          <View style={styles.leftSection}>
            <Text style={styles.datesLabel}>Datas</Text>
            <Text style={styles.datesText}>7 á 10 de março</Text>
          </View>
          <View style={styles.rightSection}>
            <TouchableOpacity onPress={() => { /* função para editar datas */ }}>
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
          {/* aonde vai ficar calendário*/}
          <View style={styles.calendarContainer}>
        <Calendar
          // Defina a data inicial do calendário
          current={'2024-06-01'}
          // Permitir seleção de múltiplas datas
          markingType={'multi-dot'}
          // Função que é chamada quando uma data é selecionada
          onDayPress={(day) => {console.log('selected day', day)}}
          // Personalize as cores e estilos
          theme={{
            backgroundColor: colors.white,
            calendarBackground: colors.white,
            textSectionTitleColor: colors.black,
            selectedDayBackgroundColor: colors.roxo700,
            selectedDayTextColor: colors.white,
            todayTextColor: colors.roxo700,
            dayTextColor: colors.black,
            textDisabledColor: colors.cinza,
            dotColor: colors.roxo700,
            selectedDotColor: colors.white,
            arrowColor: colors.roxo700,
            monthTextColor: colors.roxo700,
            indicatorColor: colors.roxo700,
            textDayFontFamily: 'Quicksand700',
            textMonthFontFamily: 'Quicksand700',
            textDayHeaderFontFamily: 'Quicksand700',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>
      {/* Botão com texto */}
      <TouchableOpacity style={styles.customButton}>
        <Text style={styles.vagasText}>Vagas</Text>
        <Text style={styles.separatorText}> - </Text>
        <Text style={styles.horariosText}>Horários às 10:00AM</Text>
      </TouchableOpacity>
      <View style={[styles.retangulo, { width: screenWidth }]}></View>
    
     {/* Nova View com o título e outras informações */}
     <View style={styles.reserveContainer2}>
        <Text style={styles.reserveTitle}>Serviços Adicionais </Text>
        <View style={styles.datesContainer}>
          <View style={styles.leftSection}>
            <Text style={styles.datesLabel}>Serviços</Text>
            <Text style={styles.datesText}>Garçons   Bufê</Text>
            
          </View>
          <View style={styles.rightSection}>
            <TouchableOpacity onPress={() => { /* função para editar datas */ }}>
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>

      <View style={[styles.retangulo, { width: screenWidth }]}></View>
 {/* Seção de Informações de Preço */}
 <View style={styles.priceInfoContainer}>
          {/* Título "Informações Preço" */}
          <Text style={styles.priceTitle}>Informações Preço</Text>
          
          {/* Preço por noite no canto esquerdo e preço total no canto direito */}
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
          
          {/* Linha reta */}
          <View style={styles.divider}></View>
          
          {/* Total e preço total em roxo */}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>R$3.245,00</Text>
          </View>
          
          {/* Botão "Continuar" */}
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  // Título alinhado ao centro
  titleContainer: {
    justifyContent: 'center', // Alinha o texto ao centro verticalmente
    alignItems: 'center', // Alinha o texto ao centro horizontalmente
    marginTop: 0, // Espaçamento no topo da tela
  },
  title: {
    fontSize: 24,
    fontFamily: 'Quicksand700', // Fonte personalizada (se disponível)
  },
  highlight: {
    color: colors.roxo700,
  },
  // Imagem do espaço
  spaceImage: {
    width: 135, // Defina a largura conforme necessário
    height: 125, // Defina a altura conforme necessário
    marginTop: 30,
    borderRadius: 10,
  },
  spaceInfo: {
    flexDirection: 'row', // Alinha os itens horizontalmente
    marginTop: 20 , 
  },
  infoContainer: {
    marginLeft: 15, // Adicione o espaçamento necessário entre a imagem e as informações
    marginTop: 22,
  },
  spaceName: {
    fontSize: 20, // Defina o tamanho da fonte conforme necessário
    fontFamily: 'Quicksand700',
    marginBottom: 10, // Adicione o espaçamento necessário abaixo do nome do espaço
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Adicione o espaçamento necessário abaixo da localização
  },
  locationText: {
    marginLeft: 5, // Adicione o espaçamento necessário entre o ícone e o texto de localização
    fontFamily: 'Quicksand700',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Adicione o espaçamento necessário abaixo da avaliação
  },
  ratingText: {
    marginLeft: 5, // Adicione o espaçamento necessário entre o ícone de estrela e o texto da avaliação
    fontFamily: 'Quicksand700',
  },
  button: {
    backgroundColor: colors.branco,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonTextverde: {
    color: colors.verde,
    fontWeight: 'bold',
  },
  //retangulo cinza 
  retangulo:{
    backgroundColor: '#EBEBEB',
    height: 10, // Altura fina
    marginTop: 20,
  },
    // Nova View para Reserve sua Festa
    reserveContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    reserveTitle: {
      fontSize: 20,
      fontFamily: 'Quicksand700',
      marginBottom: 30,
      textAlign: 'center', // Alinha o texto ao centro

    },
    datesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftSection: {
      flexDirection: 'column',
    },
    datesLabel: {
      fontSize: 16,
      fontFamily: 'Quicksand700',
      marginBottom :5 , 
    },
    datesText: {
      fontSize: 16,
      fontFamily: 'Quicksand700',
      color: colors.cinza,
   
    },
    rightSection: {
      flexDirection: 'column',
    },
    editText: {
      fontSize: 16,
      fontFamily: 'Quicksand700',
      color: colors.roxo700,
    },
    customButton: {
      backgroundColor: colors.branco,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.branco,
      marginTop: 40,
    },
    vagasText: {
      color: colors.roxo700,
      fontSize: 16,
      fontFamily: 'Quicksand700',
    },
    separatorText: {
      color: colors.black,
      fontSize: 16,
      fontFamily: 'Quicksand700',
    },
    horariosText: {
      color: colors.black,
      fontSize: 16,
      fontFamily: 'Quicksand400', 

    },
    reserveContainer2:{
marginBottom: 50 ,
marginTop:30 ,
    },
      // Container da seção de informações de preço
  priceInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  // Título da seção
  priceTitle: {
    fontSize: 20,
    fontFamily: 'Quicksand700',
    marginBottom: 30,
  },
  // Linha de preço
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  // Preço por noite
  pricePerNight: {
    fontSize: 16,
    fontFamily: 'Quicksand700',
    color: colors.cinzaEscuro,
  },
  // Preço total
  priceTotal: {
    fontSize: 16,
    fontFamily: 'Quicksand700',
    
  },
  // Linha divisória
  divider: {
    height: 1,
    backgroundColor: colors.cinzaEscuro,
    marginVertical: 10,
  },
  // Linha total
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  // Texto "Total"
  totalText: {
    fontSize: 16,
    fontFamily: 'Quicksand700',
  
  },
  // Quantia total em roxo
  totalAmount: {
    fontSize: 16,
    fontFamily: 'Quicksand700',
    color: colors.roxo700,
  },
  // Botão "Continuar"
  continueButton: {
    backgroundColor: colors.roxo700,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  // Texto do botão "Continuar"
  continueButtonText: {
    color: colors.branco,
    fontSize: 16,
    fontFamily: 'Quicksand700',
  },
});
