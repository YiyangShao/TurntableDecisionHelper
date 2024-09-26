/**
 * Turntable.js - Main logic for spinning the turntable and managing options.
 * The turntable now spins a random number of degrees.
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
  const [rotationAngle, setRotationAngle] = useState(0); // Track current rotation angle

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
        const parsedOptions = JSON.parse(savedOptions);
        setOptions(parsedOptions);
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

  const updateOptions = (inputValues) => {
    const updatedOptions = inputValues
      .map((value) => value.trim())
      .filter((value) => value); // Filter out empty inputs

    setOptions(updatedOptions);
    saveOptions(updatedOptions); // Save updated options list
  };

  // Function to spin the turntable a random number of degrees
  const spinTurntable = () => {
    if (options.length === 0) return;

    const randomDegrees = Math.floor(Math.random() * 360) + 720; // Spin at least two full rotations + random degrees
    const newRotationAngle = rotationAngle + randomDegrees; // Add to the current rotation

    setRotationAngle(newRotationAngle); // Update the rotation angle state

    Animated.timing(spinValue, {
      toValue: newRotationAngle, // Use the new rotation angle
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      const segmentAngle = 360 / options.length;
      const normalizedAngle = newRotationAngle % 360; // Normalize the angle between 0 and 360
      const selectedIndex = Math.floor((360 - normalizedAngle) / segmentAngle) % options.length;
      setSelectedOption(options[selectedIndex]); // Select the option based on the angle
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <OptionInput onUpdateOptions={updateOptions} initialOptions={options} />
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <TurntableVisual options={options} />
      </Animated.View>
      <TouchableOpacity style={styles.spinButton} onPress={spinTurntable}>
        <Text style={styles.spinText}>Spin</Text>
      </TouchableOpacity>
      {selectedOption && <Text style={styles.resultText}>You selected: {selectedOption}</Text>}
    </View>
  );
};

export default Turntable;
