/**
 * TurntableVisual.js - Displays the animated turntable and its options.
 * Handles spinning animation and passes the selected option back.
 */

import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from '../styles';

const TurntableVisual = ({ spin, options }) => {
  return (
    <Animated.View style={[styles.turntable, { transform: [{ rotate: spin }] }]}>
      {options.map((option, index) => (
        <Text key={index} style={styles.option}>{option}</Text>
      ))}
    </Animated.View>
  );
};

export default TurntableVisual;
