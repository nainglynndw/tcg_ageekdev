import {API_KEY} from '@env';
import pokemon from 'pokemontcgsdk';

pokemon.configure({apiKey: API_KEY});

export const GetPokemon = async (page = 1, name = 'blastoise') => {
  return new Promise(async (resolve, reject) => {
    try {
      const pokemons = await pokemon.card.where({
        q: `name:${name}`,
        pageSize: 12,
        page,
      });
      resolve(pokemons);
    } catch (error) {
      reject(error);
    }
  });
};
