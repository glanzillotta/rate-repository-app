import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#333',
    borderRadius: 3,
    padding: 10,
    margin: 10,
    marginBottom: 0,
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.inputBox, style, error ? { borderColor: 'red' } : null];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;