import React from 'react';
import { Link } from 'react-router-dom'; // Importando o Link
import './Home.css'; // Importando o CSS personalizado

const Home = () => {
  return (
    <section className="home-container">
      <div className="home-hero">
        <div className="home-overlay"></div>
        <div className="home-content">
          <h1 className="home-title">Descubra a Elegância</h1>
          <p className="home-subtitle">Sofisticação e Performance</p>
          <Link to="/saiba-mais">
            <button className="home-button">Saiba Mais</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;