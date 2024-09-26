/**
 * Turntable.js - This component handles the display and logic of the turntable.
 * Users can input their own decision options, remove them, and spin the turntable to randomly select one.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';

const Turntable = () => {
  const [spinValue] = useState(new Animated.Value(0));
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addOption = () => {
    const trimmedInput = inputValue.trim();

    // Validate to prevent empty or duplicate options
    if (trimmedInput && !options.includes(trimmedInput)) {
      setOptions([...options, trimmedInput]);
      setInputValue(''); // Reset the input field
    }
  };

  const removeOption = (option) => {
    setOptions(options.filter((opt) => opt !== option));
  };

  const spinTurntable = () => {
    if (options.length === 0) return;

    // Reset the spin value to 0
    spinValue.setValue(0);
    
    // Animate the turntable to spin
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000, // 3 seconds
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Select a random option after the spin
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
      {/* Input field to add options */}
      <TextInput
        style={styles.input}
        placeholder="Enter an option"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add Option" onPress={addOption} />

      {/* Display added options with remove functionality */}
      <FlatList
        data={options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.optionRow}>
            <Text style={styles.option}>{item}</Text>
            <Button title="Remove" onPress={() => removeOption(item)} />
          </View>
        )}
        style={styles.optionList}
      />

      {/* Turntable */}
      <Animated.View style={[styles.turntable, { transform: [{ rotate: spin }] }]}>
        {options.map((option, index) => (
          <Text key={index} style={styles.option}>{option}</Text>
        ))}
      </Animated.View>

      {/* Spin button */}
      <TouchableOpacity style={styles.spinButton} onPress={spinTurntable}>
        <Text style={styles.spinText}>Spin</Text>
      </TouchableOpacity>
      
      {/* Show the selected option */}
      {selectedOption && (
        <Text style={styles.resultText}>
          You selected: {selectedOption}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: 200,
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  optionList: {
    maxHeight: 150,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
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
