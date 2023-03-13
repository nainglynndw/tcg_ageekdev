import {create} from 'zustand';
import {API_KEY} from '@env';
import pokemon from 'pokemontcgsdk';
import {persist, createJSONStorage} from 'zustand/middleware';

pokemon.configure({apiKey: API_KEY});

export const useAuth = create(
  persist(
    set => ({
      auth: false,
      authChanged: () => set(state => ({auth: !state.auth})),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const usePokemon = create(set => ({
  allPokemons: [],
  addStock: (itemId, quantity) =>
    set(state => {
      if (state.allPokemons[itemId]) {
        const existingItemIndex = state.allPokemons.findIndex(
          i => i.id === itemId,
        );
        state.allPokemons[existingItemIndex].set.total += quantity;
      } else {
        state.allPokemons[existingItemIndex].set.total = quantity;
      }
    }),

  reduceStock: (itemId, quantity) =>
    set(state => {
      const existingItemIndex = state.allPokemons.findIndex(
        i => i.id === itemId,
      );
      if (
        state.allPokemons[existingItemIndex].set.total &&
        state.allPokemons[existingItemIndex].set.total >= quantity
      ) {
        state.allPokemons[existingItemIndex].set.total -= quantity;
      } else {
        throw new Error(`Cannot reduce stock of item ${itemId} by ${quantity}`);
      }
    }),

  getAllPokemonCards: payload =>
    set(state => ({
      allPokemons: [...state.allPokemons, ...payload],
    })),
}));

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: item => {
    const index = get().items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      const updatedItems = [...get().items];
      updatedItems[index].quantity += 1;
      updatedItems[index].set.total -= 1;
      set({items: updatedItems});
    } else {
      const newItem = {
        ...item,
        quantity: 1,
        set: {...set, total: item.set.total - 1},
      };
      set({items: [...get().items, newItem]});
    }
  },
  removeItem: item => {
    const index = get().items.findIndex(i => i.id === item.id);

    if (get().items[index].quantity > 1) {
      const updatedItems = [...get().items];
      updatedItems[index].quantity -= 1;
      updatedItems[index].set.total += 1;
      set({items: updatedItems});
    } else {
      const updatedItems = get().items.filter(i => i.id !== item.id);
      set({items: updatedItems});
    }
  },
  clearItems: () => {
    set({items: []});
  },
  incrementQuantity: item => {
    const index = get().items.findIndex(i => i.id === item.id);
    const updatedItems = [...get().items];
    updatedItems[index].quantity += 1;
    updatedItems[index].set.total -= 1;
    set({items: updatedItems});
  },
  decrementQuantity: item => {
    const index = get().items.findIndex(i => i.id === item.id);

    if (get().items[index].quantity > 1) {
      const updatedItems = [...get().items];
      updatedItems[index].quantity -= 1;
      updatedItems[index].set.total += 1;
      set({items: updatedItems});
    }
  },
  getTotalQuantity: () => {
    const items = get().items;
    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    return totalQuantity;
  },
  getTotalCost: () => {
    const items = get().items;
    const totalCost = items.reduce(
      (total, item) =>
        total + item.cardmarket?.prices?.trendPrice * item.quantity,
      0,
    );
    return totalCost;
  },
}));
