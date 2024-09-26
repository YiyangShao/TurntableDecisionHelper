/**
 * Turntable.js - Main logic for spinning the turntable and managing options.
 * Options are auto-saved and reflected on the turntable in real-time.
 */

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TurntableVisual from './TurntableVisual';
import OptionInput from './OptionInput';
import styles from '../styles';

const Turntable = () => {
  const [spinValue] = useState(new Animated.Value(0));
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  // Key for AsyncStorage
  const STORAGE_KEY = '@options_list';

  useEffect(() => {
    // Load options from AsyncStorage when the component mounts
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const savedOptions = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedOptions !== null) {
        setOptions(JSON.parse(savedOptions));
      }
    } catch (error) {
      console.error('Error loading options from storage:', error);
    }
  };

  const saveOptions = async (newOptions) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newOptions));
    } catch (error) {
      console.error('Error saving options to storage:', error);
    }
  };

  const addOption = (inputValues) => {
    const updatedOptions = inputValues
      .map((value) => value.trim())
      .filter((value) => value && !options.includes(value)); // Filter out duplicates and empty inputs

    if (updatedOptions.length > 0) {
      const newOptionsList = [...options, ...updatedOptions];
      setOptions(newOptionsList);
      saveOptions(newOptionsList);
    }
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
      <TurntableVisual spin={spin} options={options} />
      <TouchableOpacity style={styles.spinButton} onPress={spinTurntable}>
        <Text style={styles.spinText}>Spin</Text>
      </TouchableOpacity>
      {selectedOption && <Text style={styles.resultText}>You selected: {selectedOption}</Text>}
    </View>
  );
};

export default Turntable;
