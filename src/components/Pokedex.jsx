import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokeCard from "./Pokedex/PokeCard";
import Pagination from "./Pokedex/Pagination";
import "./Pokedex/styles/pokeDex.css";

const Pokedex = () => {
  const { trainer } = useSelector((state) => state);
  const [pokemons, setPokemons] = useState();
  const [types, setTypes] = useState();
  const [typeSelected, setTypeSelected] = useState("All pokemons");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeSelected !== "All pokemons") {
      //Hacer la peticion de los pokemons por tipo
      axios
        .get(typeSelected)
        .then((res) => setPokemons(res.data.pokemon.map((p) => p.pokemon)))
        .catch((err) => console.log(err));
    } else {
      //Hacer la peticion de todos los pokemons
      const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [typeSelected]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim().toLowerCase();
    navigate(`/pokedex/${input}`);
  };

  const handleChange = (e) => {
    setTypeSelected(e.target.value);
    setPage(1);
  };

  //logica de la paginación
  const [page, setPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(9);
  const initialPoke = (page - 1) * pokePerPage;
  const finalPoke = page * pokePerPage;
  const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage);

  return (
    <div className="pokedex">
      <h2 className="pokedex__title"><span>Welcome {trainer}</span> here you can find your favorite pokemon</h2>
      <form className="pokedex__form" onSubmit={handleSubmit}>
        <input
          className="pokedex__input"
          id="search"
          type="text"
          placeholder="Look for a Pokemon"
        />
        <button className="pokedex__button">Search</button>
        <select className="pokedex__list" onChange={handleChange}>
          <option value="All pokemons">All Pokemons</option>
          {types?.map((type) => (
            <option key={type.url} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </form>

      <div className="poke-container">
        {pokemons?.slice(initialPoke, finalPoke).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
    </div>
  );
};

export default Pokedex;
