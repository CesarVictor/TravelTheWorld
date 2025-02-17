import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import React from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const Button = ({ title, onPress, style }: ButtonProps) => {
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  decorations: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Bordures discrètes
  },
});
