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
import { Picker } from '@react-native-picker/picker';
import Form from '../Componentes/Form';
import Rodape from '../Componentes/Rodape';

export default function TDEE({ navigation }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('male');
  const [nivelAtividade, setNivelAtividade] = useState('1.55');
  const [resultado, setResultado] = useState(null);

  const calcularTDEE = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const idadeNum = parseInt(idade);
    const fatorNum = parseFloat(nivelAtividade);

    if (!peso || !altura || !idade || isNaN(pesoNum) || isNaN(alturaNum) || isNaN(idadeNum)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente!');
      return;
    }

    let bmr;
    if (sexo === 'male') {
      bmr = 10 * pesoNum + 6.25 * alturaNum - 5 * idadeNum + 5;
    } else {
      bmr = 10 * pesoNum + 6.25 * alturaNum - 5 * idadeNum - 161;
    }

    const tdee = bmr * fatorNum;
    setResultado(tdee.toFixed(2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calculadora de TDEE</Text>

      <Image source={require('../assets/tdee.png')} style={styles.image} />

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
      <Form
        placeholder="Idade (anos)"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sexo:</Text>
      <Picker
        selectedValue={sexo}
        onValueChange={(itemValue) => setSexo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Masculino" value="male" />
        <Picker.Item label="Feminino" value="female" />
      </Picker>

      <Text style={styles.label}>Nível de Atividade:</Text>
      <Picker
        selectedValue={nivelAtividade}
        onValueChange={(itemValue) => setNivelAtividade(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sedentário (pouco ou nenhum exercício)" value="1.2" />
        <Picker.Item label="Levemente ativo (1-3 dias/semana)" value="1.375" />
        <Picker.Item label="Moderadamente ativo (3-5 dias/semana)" value="1.55" />
        <Picker.Item label="Muito ativo (6-7 dias/semana)" value="1.725" />
        <Picker.Item label="Extremamente ativo (atividade intensa diária)" value="1.9" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={calcularTDEE}>
        <Text style={styles.buttonText}>Calcular TDEE</Text>
      </TouchableOpacity>

      {resultado && (
        <Text style={styles.result}>Seu TDEE: {resultado} kcal/dia</Text>
      )}

      <TouchableOpacity style={styles.buttonImage} onPress={() => navigation.navigate('IMC')}>
        <Image source={require('../assets/imc.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Ir para IMC</Text>
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
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  picker: {
    width: '100%',
    marginVertical: 5,
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
