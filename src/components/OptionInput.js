/**
 * OptionInput.js - Handles input for adding multiple decision options, each with its own input line.
 * Allows users to remove individual input lines.
 */

import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

const OptionInput = ({ onAddOption }) => {
  const [inputValues, setInputValues] = useState(['']); // Start with one empty input line

  const handleAddOption = (index, value) => {
    const updatedInputs = [...inputValues];
    updatedInputs[index] = value;
    setInputValues(updatedInputs);

    // Auto-save the updated option immediately
    onAddOption(updatedInputs);
  };

  const handleAddNewLine = () => {
    setInputValues([...inputValues, '']);
  };

  const handleRemoveLine = (index) => {
    const updatedInputs = inputValues.filter((_, i) => i !== index);
    setInputValues(updatedInputs);

    // Auto-save the updated option list
    onAddOption(updatedInputs);
  };

  return (
    <View>
      {inputValues.map((inputValue, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={`Enter option ${index + 1}`}
            value={inputValue}
            onChangeText={(value) => handleAddOption(index, value)}
          />
          <TouchableOpacity onPress={() => handleRemoveLine(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Button title="Add Another Option" onPress={handleAddNewLine} />
    </View>
  );
};

export default OptionInput;
