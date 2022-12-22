import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/pokedexInfo.css";

const PokedexInfo = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(pokemon);

  return (
    <div className="pokedexInfo">
      <header>
        <img
          className="pokedexInfo__img"
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt={`pokemon ${pokemon?.name}`}
        />
      </header>
      <section className="pokedexInfo__body">
        <h3 className={`pokedexInfo__name color-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
        <ul className="pokedexInfo__types-container">
            {
                pokemon?.types.map((type)=>(
                    <li className="pokedexInfo__type" key={type.type.name}>{type.type.name}</li>
                ))
            }
        </ul>
      </section>
      <footer className="pokedexInfo__footer">
        <ul className="pokedexInfo__stats-container">
            {
                pokemon?.stats.map(stat => (
                    <li className="pokedexInfo__stat" key={stat.stat.name}>
                        <span className="pokedexInfo__label">{stat.stat.name}</span>
                        <span className={`pokedexInfo__number color-${pokemon?.types[0].type.name}`}>{stat.base_stat}</span>
                    </li>
                ))
            }
        </ul>
      </footer>
    </div>
  );
};

export default PokedexInfo;
