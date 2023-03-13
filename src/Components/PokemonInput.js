import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const PokemonInput = ({
  label,
  labelStyle,
  placeholder = '',
  inputStyle = {},
  onChangeText = () => {},
  secureTextEntry = false,
  onKeyPress = () => {},
}) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={[{color: '#000'}, labelStyle]}>{label}</Text>}
      <TextInput
        autoCapitalize="none"
        onKeyPress={onKeyPress}
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={'grey'}
      />
    </View>
  );
};

export default React.memo(PokemonInput);

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    margin: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    color: '#000',
  },
});
