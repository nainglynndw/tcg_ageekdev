import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useCartStore} from '../Store/store';
import PokemonButton from './PokemonButton';

const {width, height} = Dimensions.get('window');

const CartModal = ({visible, onPressClose}) => {
  const {addItem, removeItem, clearItems, items} = useCartStore();
  const totalQuantity = useCartStore(state => state.getTotalQuantity());
  const getTotalCost = useCartStore(state => state.getTotalCost());

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.outerModal}>
        <View style={styles.innerModal}>
          <ScrollView style={styles.scroll}>
            {items?.length > 0 &&
              items.map((item, index) => {
                return (
                  <View key={index} style={styles.itemContainer}>
                    <Image
                      source={{uri: item.images.small}}
                      style={styles.image}
                    />
                    <View style={{marginLeft: 5}}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.price}>
                        ${item.cardmarket?.prices?.trendPrice} per card
                      </Text>
                      <Text style={styles.left}>
                        <Text style={styles.redLeft}>{item.set.total}</Text>{' '}
                        cards left
                      </Text>
                    </View>
                    <View>
                      <View style={styles.rowContainer}>
                        <Text
                          onPress={() => removeItem(item)}
                          style={[
                            styles.itemTotalCost,
                            {color: item.quantity <= 1 ? 'red' : 'blue'},
                          ]}>
                          {item.quantity <= 1 ? 'X' : '<'}
                        </Text>
                        <Text style={styles.itemTotalCost}>
                          {item.quantity}
                        </Text>
                        <Text
                          onPress={() => addItem(item)}
                          style={[
                            styles.itemTotalCost,
                            {color: item.set.total <= 1 ? 'red' : 'blue'},
                          ]}>
                          {item.set.total <= 1 ? 'X' : '>'}
                        </Text>
                      </View>
                      <Text>Price</Text>
                      <Text style={styles.price}>Price</Text>

                      <Text style={styles.itemTotalCost}>
                        $
                        {parseFloat(item.cardmarket?.prices?.trendPrice) *
                          parseFloat(item.quantity)}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.clearAll} onPress={clearItems}>
              Clear All
            </Text>
            <View style={styles.checkoutRow}>
              <Text style={styles.totalCards}>Total Cards </Text>
              <Text style={styles.totalCardsRed}>{totalQuantity}</Text>
            </View>
            <View style={styles.checkoutRow}>
              <Text style={styles.totalCards}>Total Price </Text>
              <Text style={styles.totalCardsRed}>{getTotalCost}</Text>
            </View>
            <PokemonButton
              label="Pay Now"
              btnStyle={{backgroundColor: '#625628'}}
              btnTextStyle={{color: '#fff'}}
            />
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onPressClose}>
            <Text style={styles.closeBtnText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(CartModal);

const styles = StyleSheet.create({
  outerModal: {
    width,
    height,
    backgroundColor: '#0000003f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModal: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  name: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#000',
  },
  left: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 20,
  },
  redLeft: {
    color: 'red',
  },
  image: {
    width: 70,
    height: 100,
  },
  closeBtn: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 5,
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  itemTotalCost: {
    color: 'blue',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  footer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 200,
    paddingHorizontal: 30,
  },
  clearAll: {
    paddingHorizontal: 5,
    fontSize: 14,
    color: 'grey',
    alignSelf: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  checkoutRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  totalCards: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  totalCardsRed: {
    color: 'red',
    fontWeight: 'bold',
  },
});
