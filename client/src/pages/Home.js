import "./Home.css";
import { Layout } from "antd";
import React, { useState, useEffect } from "react";
import PokemonList from "../components/pokemonList";
import HeadNav from "../components/HeadNav";

function getRandomShiny() {
  return Math.floor(Math.random() * 9) + 1;
}

const Home = () => {
  const [shiny, setShiny] = useState();

  useEffect(() => {
    setShiny(getRandomShiny);
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "50%",
        backgroundColor: "#eee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <HeadNav />
      <PokemonList shiny={shiny} />
    </Layout>
  );
};

export default Home;
