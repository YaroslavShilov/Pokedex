export const BASE_URL = "https://pokeapi.co/api/v2";
export const getImgUrl = (pokemonId: number | string): string => {
  // png
  // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  // svg v1
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
};
