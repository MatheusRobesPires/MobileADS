import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IMC from './Screens/Imc';
import TDEE from './Screens/Tdee';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IMC">
        <Stack.Screen name="IMC" component={IMC} />
        <Stack.Screen name="TDEE" component={TDEE} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
