import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import './styles/home.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()))
    e.target.name.value=''
    navigate('/pokedex')
  };
  return (
    <div className="home">
      <img className="home__img" src="/Home/pokedex.png" alt="pokedex" />
      <h1 className="home__title">¡Hi trainer!</h1>
      <p className="home__paragraph">To start, give me your name</p>
      <form className="home__form" onSubmit={handleSubmit}>
        <input className="home__input" placeholder="Your name..." id="name" type="text" />
        <button className="home__button">Start</button>
      </form>
      <footer className="footer">
      <div className="footer__black">
        <div className="footer__circle"></div>
      </div>
    </footer>
    </div>
  );
};

export default Home;
