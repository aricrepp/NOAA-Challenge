import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonStore";

export const store = configureStore({
  reducer: { pokemonStore: pokemonReducer },
});
