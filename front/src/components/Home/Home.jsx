import React from 'react';
import './Home.css'; // Importando o CSS personalizado

const Home = () => {
  return (
    <section className="home-container">
      <div className="home-hero">
        <div className="home-overlay"></div>
        <div className="home-content">
          <h1 className="home-title">Descubra a Elegância</h1>
          <p className="home-subtitle">Sofisticação e Performance</p>
          <button className="home-button">Saiba Mais</button>
        </div>
      </div>
    </section>
  );
};

export default Home;