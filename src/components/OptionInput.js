/**
 * OptionInput.js - Handles input for adding multiple decision options, each with its own input line.
 * Allows users to remove individual input lines and auto-saves changes.
 * Initial placeholders are set to "burger", "taco", and "ramen".
 * The remove button only appears for the third option and beyond.
 */

import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import styles from '../styles';

const OptionInput = ({ onUpdateOptions, initialOptions }) => {
  // Set initial placeholders for options
  const [inputValues, setInputValues] = useState(['burger', 'taco', 'ramen']);

  useEffect(() => {
    if (initialOptions && initialOptions.length > 0) {
      setInputValues(initialOptions);
    }
  }, [initialOptions]);

  const handleAddOption = (index, value) => {
    const updatedInputs = [...inputValues];
    updatedInputs[index] = value;
    setInputValues(updatedInputs);

    // Auto-update the options list immediately
    onUpdateOptions(updatedInputs);
  };

  const handleAddNewLine = () => {
    setInputValues([...inputValues, '']);
  };

  const handleRemoveLine = (index) => {
    const updatedInputs = inputValues.filter((_, i) => i !== index);
    setInputValues(updatedInputs);

    // Auto-update the options list after removal
    onUpdateOptions(updatedInputs);
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
          {/* Only show the remove button for the third option and beyond */}
          {index >= 2 && (
            <TouchableOpacity onPress={() => handleRemoveLine(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>-</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <Button title="Add Another Option" onPress={handleAddNewLine} />
    </View>
  );
};

export default OptionInput;
