/**
 * TurntableVisual.js - Displays the animated turntable and its options.
 * Handles spinning animation and passes the selected option back.
 */

import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const TurntableVisual = ({ spin, options }) => {
  return (
    <Animated.View style={[styles.turntable, { transform: [{ rotate: spin }] }]}>
      {options.map((option, index) => (
        <Text key={index} style={styles.option}>{option}</Text>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  turntable: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  option: {
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default TurntableVisual;
