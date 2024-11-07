import "./App.css";
import React from "react";
import Layout from "./components/Layout/Layout";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Layout />
    </SearchProvider>
  );
}

export default App;
