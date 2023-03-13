import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const PokemonButton = ({label, onPress, btnStyle, btnTextStyle}) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={onPress} style={[styles.btn, btnStyle]}>
        <Text style={[styles.btnText, btnTextStyle]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(PokemonButton);

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btn: {
    width: '100%',
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnText: {
    fontWeight: 'bold',
  },
});
