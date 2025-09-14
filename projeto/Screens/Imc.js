import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Form from '../Componentes/Form';
import Rodape from '../Componentes/Rodape';

export default function IMC({ navigation }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!peso || !altura || isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert('Erro', 'Preencha peso e altura corretamente!');
      return;
    }

    const alturaMetros = alturaNum / 100;
    const imc = pesoNum / (alturaMetros ** 2);
    setResultado(imc.toFixed(2));
  };

  const getCategoria = () => {
    const valor = parseFloat(resultado);
    if (valor < 18.5) return 'Abaixo do peso';
    if (valor < 25) return 'Peso normal';
    if (valor < 30) return 'Sobrepeso';
    return 'Obesidade';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <Image source={require('../assets/imc.png')} style={styles.image} />

      <Form
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="decimal-pad"
      />
      <Form
        placeholder="Altura (cm)"
        value={altura}
        onChangeText={setAltura}
        keyboardType="decimal-pad"
      />

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {resultado && (
        <Text style={styles.result}>
          Seu IMC: {resultado} ({getCategoria()})
        </Text>
      )}

      {/* Botão personalizado com imagem para navegar para TDEE */}
      <TouchableOpacity style={styles.buttonImage} onPress={() => navigation.navigate('TDEE')}>
        <Image source={require('../assets/tdee.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Ir para TDEE</Text>
      </TouchableOpacity>

      <Rodape />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonImage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
});
