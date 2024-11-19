import React, { useState, useEffect } from 'react';
import './ListCarros.css';

const url = 'http://localhost:3000/carros';

const ListCarros = () => {
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCarros, setSelectedCarros] = useState(null);
    const [formData, setFormData] = useState({ nome: '', marca: '', ano: '' ,price: '', cor: '', image: '' });

    useEffect(() => {
        const fetchCarros = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Falha ao tentar ler os carros');
                }
                const data = await response.json();
                setCarros(data.carros);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCarros();
    }, []);

    const deleteCarro = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Falha ao excluir o Carro');
            }
            setCarros(carros.filter((carros) => carros.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (carros) => {
        setSelectedCarros(carros);
        setFormData({ ...carros });
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
            setCarros(carros.map((carros) => (carros.id === selectedCarros.id ? formData : carros)));
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
            {carros.length === 0 ? (
                <p>Nenhum carro encontrado :(</p>
            ) : (
                <table className="pet-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>marca</th>
                            <th>ano</th>
                            <th>Preço</th>
                            <th>Cor</th>
                            <th>Imagem</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carros.map((carros) => (
                            <tr key={carros.id}>
                                <td>{carros.nome}</td>
                                <td>{carros.marca}</td>
                                <td>{carros.ano}</td>
                                <td>R${carros.price}</td>
                                <td>{carros.cor}</td>
                                <td>
                                    {carros.image && (
                                        <img
                                            src={`http://localhost:3000/${carros.image}`}
                                            alt={`Imagem de ${carros.nome}`}
                                            className="pet-image"
                                        />
                                    )}
                                </td>
                                <td className="button-group">
                                    <button className="edit-button" onClick={() => handleEditClick(carros)}>Editar</button>
                                    <button className="delete-button" onClick={() => deleteCarro(carros.id)}>Excluir</button>
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
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Nome"
                    />
                    <input
                        type="text"
                        name="marca"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Marca"
                    />
                    <input
                        type="date"
                        name="ano"
                        value={formData.nasc}
                        onChange={handleInputChange}
                        placeholder="Ano"
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.peso}
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
