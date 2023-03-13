import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import PokemonInput from '../Components/PokemonInput';
import PokemonButton from '../Components/PokemonButton';
import {useAuth} from '../Store/store';

const LoginScreen = () => {
  const [userInput, setUserInput] = useState({email: '', password: ''});
  const {authChanged} = useAuth();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pokemon.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      <PokemonInput
        placeholder="pokemon@gmail.com"
        label="Email"
        labelStyle={styles.labelStyle}
        onChangeText={text => {
          setUserInput({...userInput, email: text});
        }}
      />
      <PokemonInput
        secureTextEntry
        placeholder="pokemon"
        label="Password"
        labelStyle={styles.labelStyle}
        onChangeText={text => {
          setUserInput({...userInput, password: text});
        }}
      />
      <PokemonButton
        btnStyle={{backgroundColor: '#bba7c7'}}
        label="Login"
        onPress={() => {
          if (
            userInput.email === 'pokemon@gmail.com' &&
            userInput.password === 'pokemon'
          ) {
            return authChanged();
          }
        }}
      />
    </View>
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 50,
    color: '#000',
  },
  labelStyle: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
  },
});
