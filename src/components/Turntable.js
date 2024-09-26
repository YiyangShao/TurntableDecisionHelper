/**
 * Turntable.js - This component handles the display and logic of the turntable.
 * Users will interact with the turntable to make decisions by spinning it.
 */

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Turntable = () => {
  const spinTurntable = () => {
    // Placeholder logic for spinning the turntable
    console.log('Turntable is spinning!');
  };

  return (
    <View style={styles.container}>
      <Text>Turntable Component</Text>
      <Button title="Spin" onPress={spinTurntable} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Turntable;
