import React, { useState, useEffect } from "react";
import { Space, Card, Row, Col, Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemon, getPokeStatus } from "../redux/pokemonStore";
import GrassIcon from "../assets/grass_type_symbol.png";
import FireIcon from "../assets/fire_type_symbol.png";
import WaterIcon from "../assets/water_type_symbol.png";
import "./pokemonList.css";

function capitalizeFirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getTypeIcon(type) {
  if (type === "grass") {
    return GrassIcon;
  } else if (type === "fire") {
    return FireIcon;
  } else return WaterIcon;
}

function getPokeImage(poke, shiny) {
  if (shiny === poke.id) {
    return poke.sprites.front_shiny;
  } else {
    return poke.sprites.front_default;
  }
}

function getBackground(type, shiny, id) {
  if (type === "grass") {
    if (shiny === id) {
      return "lightgrey";
    }
    return "linear-gradient(135deg, rgba(105,255,140,1) 0%, rgba(0,200,67,1) 100%)";
  } else if (type === "fire") {
    if (shiny === id) {
      return "lightgrey";
    }
    return "linear-gradient(135deg, rgba(255,140,105,1) 0%, rgba(255,68,0,1) 100%)";
  } else {
    if (shiny === id) {
      return "lightgrey";
    }
    return "linear-gradient(135deg, rgba(105,211,255,1) 0%, rgba(0,129,255,1) 100%)";
  }
}

function getRandomAbility(poke) {
  return poke.abilities[Math.floor(Math.random() * 2)].ability.name;
}

const PokemonList = (props) => {
  const { searchedPokemon, isBattling } = useSelector(
    (state) => state.pokemonStore
  );
  const [startB, setB] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const getStatus = useSelector(getPokeStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getStatus === "idle") {
      dispatch(fetchPokemon());
    }
  }, [getStatus, dispatch]);

  useEffect(() => {
    if (isBattling === true) {
      setB(true);
    }
  }, [isBattling]);

  useEffect(() => {
    function decideBattle() {
      if (
        selectedPokemon[0].types[0].type.name === "fire" &&
        selectedPokemon[1].types[0].type.name === "water"
      ) {
        alert(selectedPokemon[1].name + " wins");
      } else if (
        selectedPokemon[0].types[0].type.name === "water" &&
        selectedPokemon[1].types[0].type.name === "grass"
      ) {
        alert(selectedPokemon[1].name + " wins");
      } else if (
        selectedPokemon[0].types[0].type.name === "grass" &&
        selectedPokemon[1].types[0].type.name === "fire"
      ) {
        alert(selectedPokemon[1].name + " wins");
      } else if (
        selectedPokemon[0].types[0].type.name ===
        selectedPokemon[1].types[0].type.name
      ) {
        selectedPokemon[0].id > selectedPokemon[1].id
          ? alert(selectedPokemon[0].name + " wins")
          : alert(selectedPokemon[1].name + " wins");
      }

      setSelectedPokemon([]);
    }

    if (selectedPokemon !== undefined) {
      if (selectedPokemon.length === 2) {
        decideBattle();
      }
    }
  }, [selectedPokemon]);

  const selectForBattle = (item) => {
    if (startB) {
      if (selectedPokemon !== undefined) {
        setSelectedPokemon([...selectedPokemon, item]);
      } else {
        setSelectedPokemon([item]);
      }
    }
  };

  if (getStatus === "loading") {
    return (
      <Space>
        <Card>
          <p>Loading...</p>
        </Card>
      </Space>
    );
  } else if (getStatus === "succeeded") {
    return (
      <>
        <Space align="center">
          <Row gutter={16}>
            {searchedPokemon.map((item, i) => {
              return (
                <Col
                  span={8}
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    size="small"
                    className={startB ? "hoverHighlight" : ""}
                    onClick={() => selectForBattle(item)}
                    style={{
                      width: 200,
                      height: 225,
                      margin: "10px ",
                      border: "6px solid #eed650",
                      background: getBackground(
                        item.types[0].type.name,
                        props.shiny,
                        item.id
                      ),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <div>{capitalizeFirst(item.name)}</div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div>hp {item.stats[0].base_stat}</div>
                          <Image
                            width={20}
                            preview={false}
                            src={getTypeIcon(item.types[0].type.name)}
                          />
                        </div>
                      </div>
                      <div>
                        <Image
                          width={90}
                          preview={false}
                          src={getPokeImage(item, props.shiny)}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.7rem",
                          }}
                        >
                          Weight: {item.weight}
                        </div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                          }}
                        >
                          Height: {item.height}
                        </div>
                      </div>
                      <div>
                        <div>{getRandomAbility(item)}</div>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Space>
      </>
    );
  }
};

export default PokemonList;
