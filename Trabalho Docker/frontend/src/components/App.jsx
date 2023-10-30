import React, { useState, useEffect } from "react";
import MovieForm from "./MovieForm";
import TitleForm from "./TitleForm";
import MovieList from "./MovieList"
import api from "../services/api";
import "./App.css";

function App() {
  const alimentosEndpoint = "/alimentos";
  const bebidasEndpoint = "/bebidas";
  const compareEndpoint = "/compare";
  const [searchResult, setSearchResult] = useState("");
  const [alimentos, setAlimentos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [error, setError] = useState();

  const fetchAlimentos = async () => {
    try {
      const { data } = await api.get(alimentosEndpoint);
      setAlimentos(data);
    } catch (error) {
      setError("Não foi possível buscar os alimentos!");
    }
  };
  const fetchBebidas = async () => {
    try {
      const { data } = await api.get(bebidasEndpoint);
      setBebidas(data);
    } catch (error) {
      setError("Não foi possível buscar as bebidas!");
    }
  };

  const handleAddAlimento = async (title) => {
    try {
      const alimento = { _id: Date.now(), title };
      setAlimentos([...alimentos, alimento]);

      const { data: savedAlimento } = await api.create(alimentosEndpoint, alimento);

      setAlimentos([...alimentos, savedAlimento]);
    } catch (error) {
      setError("Não foi possível salvar o alimento!");
      setAlimentos(alimentos);
    }
  };

  const titleSearch = async (title) => {
    if (title === ""){
      setSearchResult({
        alimento: null,
        bebida: null
      });
      return;
    }
    try {
      const { data } = await api.get(compareEndpoint+"/"+title);
      setSearchResult(data);
    } catch (error) {
      console.log("Não foi possível buscar os alimentos!");
    }
  };

  const handleAddBebida = async (title) => {
    try {
      const bebida = { _id: Date.now(), title };
      setBebidas([...bebidas, bebida]);

      const { data: savedBebida } = await api.create(bebidasEndpoint, bebida);

      setBebidas([...bebidas, savedBebida]);
    } catch (error) {
      setError("Não foi possível salvar a bebida!");
      setBebidas(bebidas);
    }
  };

  const handleDeleteAlimento = async (alimento) => {
    try {
      setAlimentos(alimentos.filter((m) => m !== alimento));
      await api.remove(alimentosEndpoint + "/" + alimento._id);
    } catch (error) {
      setError("Não foi possível excluir o alimento!");
      setAlimentos(alimentos);
    }
  };

  const handleDeleteBebida = async (bebida) => {
    try {
      setBebidas(bebidas.filter((s) => s !== bebida));
      await api.remove(bebidasEndpoint + "/" + bebida._id);
    } catch (error) {
      setError("Não foi possível excluir a bebida!");
      setBebidas(bebidas);
    }
  };

  useEffect(() => {
    fetchAlimentos();
    fetchBebidas();
  }, []);

  return (
    <div className="App">
      <div className="alimentoContainer">
        <h1>Estoque de Alimentos</h1>
        <MovieForm onAddMovie={handleAddAlimento} placeholder="Adicione o alimento" />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <MovieList movies={alimentos} onDeleteMovie={handleDeleteAlimento} type="AlimentoItem" />
      </div>
      <div className="bebidasContainer">
        <h1>Estoque de Bebidas</h1>
        <MovieForm onAddMovie={handleAddBebida} placeholder="Adicione a bebida" />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <MovieList movies={bebidas} onDeleteMovie={handleDeleteBebida} type="BebidaItem"/>
      </div>
      <div className="compareContainer">
        <h1>Consulte o alimento ou a bebida desejada para a consulta no estoque do supermercado:</h1>
        <TitleForm onSearchTitle={titleSearch} searchResult={searchResult} />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
