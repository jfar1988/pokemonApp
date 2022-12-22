import React from "react";
import "./styles/headerPoke.css";

const HeaderPoke = () => {
  return (
    <header className="header">
      <div className="header__black">
        <img
          className="header__img"
          src="../../../public/Home/pokedex.png"
          alt=""
        />
        <div className="header__circle"></div>
      </div>
    </header>
  );
};

export default HeaderPoke;
