import React from 'react';
import './ListCatalogo.css';

const ListCatalogo = ({ veiculos }) => {
  return (
    <section className="catalogo-container">
      <h2 className="catalogo-title">Veículos Disponíveis</h2>
      <div className="catalogo-list">
        {veiculos.map((veiculo, index) => (
          <div key={index} className="catalogo-item">
            <img src={veiculo.imagem} alt={veiculo.nome} className="catalogo-image" />
            <div className="catalogo-info">
              <h3 className="veiculo-nome">{veiculo.nome}</h3>
              <p className="veiculo-preco">{veiculo.preco}</p>
              <button className="veiculo-detalhes-button">Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListCatalogo;
