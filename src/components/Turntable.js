/**
 * Turntable.js - Main logic for spinning the turntable and managing options.
 * Integrates `TurntableVisual`, `OptionInput`, and `OptionList` components.
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import TurntableVisual from './TurntableVisual';
import OptionInput from './OptionInput';
import OptionList from './OptionList';

const Turntable = () => {
  const [spinValue] = useState(new Animated.Value(0));
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const addOption = (inputValue) => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !options.includes(trimmedInput)) {
      setOptions([...options, trimmedInput]);
    }
  };

  const removeOption = (option) => {
    setOptions(options.filter((opt) => opt !== option));
  };

  const spinTurntable = () => {
    if (options.length === 0) return;

    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setSelectedOption(options[randomIndex]);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <OptionInput onAddOption={addOption} />
      <OptionList options={options} onRemoveOption={removeOption} />
      <TurntableVisual spin={spin} options={options} />
      <TouchableOpacity style={styles.spinButton} onPress={spinTurntable}>
        <Text style={styles.spinText}>Spin</Text>
      </TouchableOpacity>
      {selectedOption && <Text style={styles.resultText}>You selected: {selectedOption}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spinButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  spinText: {
    color: '#fff',
    fontSize: 16,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },
});

export default Turntable;
