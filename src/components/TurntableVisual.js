/**
 * TurntableVisual.js - Displays the animated turntable and its options.
 * Options are arranged as a pie chart around the turntable.
 */

import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import styles from '../styles';

const TurntableVisual = ({ spin, options }) => {
  const angleStep = 360 / options.length; // Calculate angle for each option

  const getOptionStyle = (index) => {
    const rotateAngle = angleStep * index;
    return {
      transform: [
        { rotate: `${rotateAngle}deg` },
        { translateY: -90 }, // Position away from the center of the circle
      ],
    };
  };

  return (
    <Animated.View style={[styles.turntable, { transform: [{ rotate: spin }] }]}>
      {options.map((option, index) => (
        <View key={index} style={[styles.optionContainer, getOptionStyle(index)]}>
          <Text style={styles.option}>{option}</Text>
        </View>
      ))}
    </Animated.View>
  );
};

export default TurntableVisual;
