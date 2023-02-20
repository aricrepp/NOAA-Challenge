import "./App.css";
import { Layout } from "antd";
import React from "react";
import Home from "./pages/Home";

const App = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Home />
    </Layout>
  );
};

export default App;
