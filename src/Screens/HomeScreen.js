import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GetPokemon} from '../Hooks/GetPokemons';
import {useQuery} from 'react-query';
import PokemonInput from '../Components/PokemonInput';
import PokemonButton from '../Components/PokemonButton';
import {useCartStore, usePokemon} from '../Store/store';
import CartModal from '../Components/CartModal';

const HomeScreen = () => {
  const [pagination, setPagination] = useState(1);
  const [searchNameText, setSearchNameText] = useState('blastoise');
  const totalQuantity = useCartStore(state => state.getTotalQuantity());
  const {addItem} = useCartStore();
  const [cartVisible, setCartVisible] = useState(false);
  const {allPokemons, getAllPokemonCards} = usePokemon();
  const {isLoading, error, refetch} = useQuery(
    'pokemon',
    () => {
      return GetPokemon(pagination, searchNameText);
    },
    {
      onSuccess: data => {
        getAllPokemonCards([...data?.data]);
      },
    },
  );

  useEffect(() => {
    refetch();
  }, [pagination, searchNameText]);

  if (error)
    return <Text style={{color: 'black'}}>Error: {error.message}</Text>;

  const PokemonCard = ({item}) => {
    const addCart = () => {
      addItem(item);
    };

    return (
      <View style={styles.pokemonCardContainer}>
        <Image
          source={{uri: item?.images?.large}}
          resizeMode="cover"
          style={styles.pokemonImage}
        />
        <View style={styles.pokemonCard}>
          <Text style={styles.pokemonName}>{item?.name}</Text>
          <Text style={styles.pokemonRarity}>{item?.rarity}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.pokemonDataText}>
              ${item?.cardmarket?.prices?.trendPrice}
            </Text>
            <Text style={styles.pokemonDataText}>{item?.set?.total} left</Text>
          </View>
        </View>
        <PokemonButton
          label="Select Card"
          btnStyle={styles.selectBtnStyle}
          onPress={addCart}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TCG Marketplace</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/pokemon.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
      </View>

      <FlatList
        style={{width: '100%'}}
        scrollEnabled
        data={allPokemons}
        keyExtractor={(_, index) => index}
        renderItem={PokemonCard}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        ListHeaderComponent={() => {
          return (
            <View style={styles.searchContainer}>
              <PokemonInput
                placeholder="Name"
                inputStyle={{textAlign: 'center'}}
              />
            </View>
          );
        }}
        ListFooterComponent={() => {
          if (isLoading || allPokemons?.length === 0)
            return <ActivityIndicator size="small" color="black" />;
          return (
            <TouchableOpacity
              onPress={() => {
                setPagination(prev => prev + 1);
              }}
              style={styles.showMoreContainer}>
              <Image
                source={require('../assets/search.png')}
                style={styles.searchImg}
              />
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addCart}
        onPress={() => {
          totalQuantity > 0 && setCartVisible(true);
        }}>
        <Image source={require('../assets/cart.png')} style={styles.cartImg} />
        <Text style={styles.viewCart}>View Cart</Text>
        {totalQuantity > 0 && (
          <Text style={styles.itemsNumber}>{totalQuantity}</Text>
        )}
      </TouchableOpacity>
      <CartModal
        visible={cartVisible}
        onPressClose={() => {
          setCartVisible(false);
        }}
      />
    </View>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  logoContainer: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: -18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
    zIndex: 10000,
  },
  logo: {
    width: 30,
    height: 30,
    zIndex: 10000,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginVertical: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  pokemonCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 250,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    bottom: -35,
    zIndex: 1,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  selectBtnStyle: {
    backgroundColor: '#fcba03',
    bottom: 30,
    width: 150,
    alignSelf: 'center',
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  pokemonRarity: {
    color: '#03adfc',
    marginVertical: 3,
  },
  pokemonDataText: {
    color: '#000',
  },
  showMoreContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 150,
  },
  searchImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  showMoreText: {
    color: 'grey',
    fontSize: 12,
    marginLeft: 10,
  },
  addCart: {
    position: 'absolute',
    backgroundColor: '#366bc7',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    bottom: 100,
    flexDirection: 'row',
  },
  cartImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  viewCart: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff',
  },
  itemsNumber: {
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 7,
    position: 'absolute',
    fontSize: 10,
    top: -5,
  },
});
