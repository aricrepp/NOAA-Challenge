import "./HeadNav.css";
import { Layout, Input, Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import {
  filterPokemon,
  onClearSearch,
  startBattling,
} from "../redux/pokemonStore";
const { Header } = Layout;
const { Search } = Input;

const HeadNav = () => {
  const dispatch = useDispatch();

  const onSearch = (item) => {
    dispatch(filterPokemon(item));
  };
  const onChange = (e) => {
    dispatch(onClearSearch());
  };
  const startBattle = () => {
    dispatch(startBattling());
  };

  return (
    <Layout style={{ width: "100%", maxHeight: "60px" }}>
      <Header
        style={{
          background: "#eee",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Search
            placeholder="Search pokemon"
            allowClear
            onSearch={onSearch}
            onChange={onChange}
            style={{ width: "250px" }}
          />
          <Button onClick={startBattle}>Battle!</Button>
        </div>
      </Header>
    </Layout>
  );
};

export default HeadNav;
