/**
 * styles.js - Contains shared styles for all components in the Turntable Decision Helper app.
 */

import { StyleSheet } from 'react-native';

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

export default styles;
