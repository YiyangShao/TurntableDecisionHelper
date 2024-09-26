/**
 * OptionInput.js - Handles input for adding new decision options.
 */

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const OptionInput = ({ onAddOption }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddOption = () => {
    onAddOption(inputValue);
    setInputValue('');
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter an option"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add Option" onPress={handleAddOption} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
});

export default OptionInput;
