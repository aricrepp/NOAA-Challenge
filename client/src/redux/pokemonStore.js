import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pokemon: [],
  searchedPokemon: [],
  status: "idle",
  error: null,
  isBattling: false,
};

export const fetchPokemon = createAsyncThunk("/", async () => {
  let complete = [];
  try {
    let pokemon = [
      "https://pokeapi.co/api/v2/pokemon/1",
      "https://pokeapi.co/api/v2/pokemon/2",
      "https://pokeapi.co/api/v2/pokemon/3",
      "https://pokeapi.co/api/v2/pokemon/4",
      "https://pokeapi.co/api/v2/pokemon/5",
      "https://pokeapi.co/api/v2/pokemon/6",
      "https://pokeapi.co/api/v2/pokemon/7",
      "https://pokeapi.co/api/v2/pokemon/8",
      "https://pokeapi.co/api/v2/pokemon/9",
    ];
    const requests = pokemon.map((url) => axios.get(url));

    complete = axios.all(requests).then((responses) => {
      return responses;
    });

    return complete;
  } catch (err) {
    return err.message;
  }
});

export const pokemonSlice = createSlice({
  name: "pokemonStore",
  initialState: initialState,
  reducers: {
    filterPokemon: (state, action) => {
      let found = current(state.searchedPokemon).filter((match) => {
        return match.name.toLowerCase().includes(action.payload.toLowerCase());
      });
      if (found.length === 0) {
        return;
      } else {
        state.searchedPokemon = found;
      }
    },
    onClearSearch: (state, action) => {
      state.searchedPokemon = state.pokemon;
    },
    startBattling: (state) => {
      state.isBattling = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPokemon.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        action.payload.forEach((item) => {
          state.pokemon.push({ ...item.data, battling: false });
          state.searchedPokemon.push({ ...item.data, battling: false });
        });
        state.status = "succeeded";
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        console.log(action.error);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterPokemon, onClearSearch, startBattling } =
  pokemonSlice.actions;
export const getPokeStatus = (state) => state.pokemonStore.status;
export const getBattling = (state) => state.pokemonStore.isBattling;

export default pokemonSlice.reducer;
