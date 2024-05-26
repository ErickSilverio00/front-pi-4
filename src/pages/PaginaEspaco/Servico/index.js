import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Servico = ({ navigation }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const handlePress = (service) => {
    let newSelectedServices;
    if (selectedServices.includes(service)) {
      newSelectedServices = selectedServices.filter((item) => item !== service);
    } else {
      newSelectedServices = [...selectedServices, service];
    }
    setSelectedServices(newSelectedServices);
  };

  const isServiceSelected = (service) => {
    return selectedServices.includes(service);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Serviços <Feather name="server" size={24} /></Text>

      <View style={[styles.divider, { marginTop: 67 }]} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.serviceButton, isServiceSelected('bufê') && styles.selectedButton]}
          onPress={() => handlePress('bufê')}>
          <Feather name="coffee" size={24} color={isServiceSelected('bufê') ? '#FFFFFF' : '#B517E2'} />
          <Text style={styles.serviceButtonText}>Bufê</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.serviceButton, isServiceSelected('wife') && styles.selectedButton]}
          onPress={() => handlePress('wife')}>
          <Feather name="wifi" size={24} color={isServiceSelected('wife') ? '#FFFFFF' : '#B517E2'} />
          <Text style={styles.serviceButtonText}>Wife</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.serviceButton, isServiceSelected('bartender') && styles.selectedButton]}
          onPress={() => handlePress('bartender')}>
          <Feather name="user" size={24} color={isServiceSelected('bartender') ? '#FFFFFF' : '#B517E2'} />
          <Text style={styles.serviceButtonText}>Bartender</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.serviceButton, isServiceSelected('drinks') && styles.selectedButton]}
          onPress={() => handlePress('drinks')}>
          <Feather name="coffee" size={24} color={isServiceSelected('drinks') ? '#FFFFFF' : '#B517E2'} />
          <Text style={styles.serviceButtonText}>Drinks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.serviceButton, isServiceSelected('garçons') && styles.selectedButton]}
          onPress={() => handlePress('garçons')}>
          <Feather name="users" size={24} color={isServiceSelected('garçons') ? '#FFFFFF' : '#B517E2'} />
          <Text style={styles.serviceButtonText}>Garçons</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Text style={styles.infoText}>Info: Serviços adicionais, que podem influenciar no valor final</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B517E2',
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Quicksand',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22.5,
    letterSpacing: -0.24,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 20,
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 160,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#B517E2',
  },
  selectedButton: {
    backgroundColor: '#B517E2',
  },
  serviceButtonText: {
    fontFamily: 'Quicksand',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22.5,
    letterSpacing: -0.24,
    color: '#000000',
    marginLeft: 5,
  },
  infoText: {
    fontFamily: 'Quicksand',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22.5,
    letterSpacing: -0.24,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Servico;
