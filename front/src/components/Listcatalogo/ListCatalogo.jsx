import React, { useState, useEffect } from 'react';
import './ListCatalogo.css';

const url = 'http://localhost:3000/cars';

const ListCatalogo = () => {
    const [cars, setCars] = useState([]); // Estado local para veículos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const exampleCars = [
          {
              modelo: 'RAM 1500 Limited',
              preco: 'R$ 350.000,00',
              imagem: 'https://carrosbemmontados.com.br/wp-content/uploads/2024/07/RAM-1500-Limited-2024-4.png',
          },
          {
              modelo: 'RAM 2500 Laramie',
              preco: 'R$ 400.000,00',
              imagem: 'https://quatrorodas.abril.com.br/wp-content/uploads/2021/08/ram_3500_limited_crew_cab_59-e1628699816107.jpeg?quality=70&strip=info&w=720&crop=1',
          },
          {
            modelo: 'RAM 3500 Heavy Duty',
              preco: 'R$ 450.000,00',
              imagem: 'https://quatrorodas.abril.com.br/wp-content/uploads/2021/08/ram_3500_limited_crew_cab_59-e1628699816107.jpeg?quality=70&strip=info&w=720&crop=1',
          },
      ];
  
      const fetchCars = async () => {
          try {
              const response = await fetch(url);
              if (!response.ok) {
                  throw new Error('Falha ao tentar ler os carros');
              }
              const data = await response.json();
              const apiCars = Array.isArray(data.cars) ? data.cars : [];
              setCars([...exampleCars, ...apiCars]); // Adiciona os carros de exemplo junto com os carros da API
              setLoading(false);
          } catch (err) {
              setError(err.message);
              setLoading(false);
          }
      };
  
      fetchCars();
  }, []);

    if (loading) return <p>Carregando Carros...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="catalogo-list-container">
            <h2>Catálogo de Carros</h2>
            {cars.length === 0 ? (
                <p>Nenhum carro encontrado</p>
            ) : (
                <table className="catalogo-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ano</th>
                            <th>Preço</th>
                            <th>Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.modelo}</td>
                                <td>{car.ano}</td>
                                <td>R${car.preco}</td>
                                <td>
                                    {car.image && (
                                        <img
                                            src={`http://localhost:3000/${car.image}`}
                                            alt={`Imagem de ${car.modelo}`}
                                            className="catalogo-image"
                                        />
                                    )}
                                    {!car.image && car.imagem && (
                                        <img
                                            src={car.imagem}
                                            alt={`Imagem de ${car.modelo}`}
                                            className="catalogo-image"
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListCatalogo;