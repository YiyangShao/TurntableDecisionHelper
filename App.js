/**
 * App.js - Main entry point of the Turntable Decision Helper app.
 * This file sets up the main structure and renders the Turntable component.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Turntable from './src/components/Turntable';

export default function TurntableHelper() {
  return (
    <View style={styles.container}>
      <Turntable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
