/**
 * OptionList.js - Displays the list of options with the ability to remove them.
 */

import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import styles from '../styles';

const OptionList = ({ options, onRemoveOption }) => {
  return (
    <FlatList
      data={options}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.optionRow}>
          <Text style={styles.option}>{item}</Text>
          <Button title="Remove" onPress={() => onRemoveOption(item)} />
        </View>
      )}
      style={styles.optionList}
    />
  );
};

export default OptionList;
