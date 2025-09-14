import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Rodape() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
});
