/**
 * OptionList.js - Displays the list of options with the ability to remove them.
 */

import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  optionList: {
    maxHeight: 150,
    marginBottom: 20,
  },
  option: {
    textAlign: 'center',
  },
});

export default OptionList;
