import React, { useState, useEffect } from 'react';
import './ListCarros.css';

const url = 'http://localhost:3000/cars';

const ListCarros = () => {
    const [cars, setCars] = useState([]); // Garantir que cars seja um array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCarros, setSelectedCarros] = useState(null);
    const [formData, setFormData] = useState({ modelo: '', ano: '', preco: '', cor: '', image: '' });

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Falha ao tentar ler os carros');
                }
                const data = await response.json();
                console.log(data); // Verificando a estrutura dos dados
                setCars(Array.isArray(data.cars) ? data.cars : []); // Verificando se 'data.cars' é um array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const deleteCarro = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Falha ao excluir o Carro');
            }
            setCars(cars.filter((car) => car.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (car) => {
        setSelectedCarros(car);
        setFormData({ ...car });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const updateCarro = async () => {
        try {
            const response = await fetch(`${url}/${selectedCarros.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Falha ao atualizar o carro');
            }
            setCars(cars.map((car) => (car.id === selectedCarros.id ? formData : car)));
            setSelectedCarros(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Carregando Carros...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="pet-list-container">
            <h2>Lista de Carros</h2>
            {Array.isArray(cars) && cars.length === 0 ? (
                <p>Nenhum carro encontrado</p>
            ) : (
                <table className="pet-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Ano</th>
                            <th>Preço</th>
                            <th>Cor</th>
                            <th>Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(cars) &&
                            cars.map((car) => (
                                <tr key={car.id}>
                                    <td>{car.modelo}</td>
                                    <td>{car.ano}</td>
                                    <td>R${car.preco}</td>
                                    <td>{car.cor}</td>
                                    <td>
                                        {car.image && (
                                            <img
                                                src={`http://localhost:3000/${car.image}`}
                                                alt={`Imagem de ${car.modelo}`}
                                                className="pet-image"
                                            />
                                        )}
                                    </td>
                                    <td className="button-group">
                                        <button className="edit-button" onClick={() => handleEditClick(car)}>Editar</button>
                                        <button className="delete-button" onClick={() => deleteCarro(car.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}

            {selectedCarros && (
                <div className="edit-form">
                    <h3>Editar carro</h3>
                    <input
                        type="text"
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleInputChange}
                        placeholder="Modelo"
                    />
                    <input
                        type="date"
                        name="ano"
                        value={formData.ano}
                        onChange={handleInputChange}
                        placeholder="Ano"
                    />
                    <input
                        type="number"
                        name="preco"
                        value={formData.preco}
                        onChange={handleInputChange}
                        placeholder="Preço"
                    />
                    <input
                        type="text"
                        name="cor"
                        value={formData.cor}
                        onChange={handleInputChange}
                        placeholder="Cor"
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div className="button-group">
                        <button className="save-button" onClick={updateCarro}>Salvar</button>
                        <button className="cancel-button" onClick={() => setSelectedCarros(null)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListCarros;
