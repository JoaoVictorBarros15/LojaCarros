import React from 'react';
import './Saiba.css'; // Importando o CSS

const Saiba = () => {
  return (
      <section className="saiba-container">
       
      <div className="saiba-hero">
        <h1 className="saiba-title">Titanium Motors</h1>
        <p className="saiba-subtitle">
          Desempenho Excepcional, Sofisticação Inigualável
        </p>
      </div>
      <div className="saiba-content">
        <div className="saiba-info">
          <h2>Carros Novos e Usados</h2>
          <p>
            Oferecemos uma coleção exclusiva de carros de luxo, novos e usados,
            que combinam desempenho, design e tecnologia de ponta. Desde SUVs robustos até sedans
            elegantes, temos o veículo perfeito para cada estilo de vida.
          </p>
        </div>
              </div>
          
    </section>
  );
};

export default Saiba;
