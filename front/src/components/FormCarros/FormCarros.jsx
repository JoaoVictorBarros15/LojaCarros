import React, { useState } from 'react';
import './FormCarros.css';

const url = 'http://localhost:3000/carros';

const FormCarro = () => {
    const [formData, setFormData] = useState({
        nome: '',
        marca: '',
        ano: '',
        price: '',
        cor: '',
        image: null // Alterado para null para verificar se uma imagem foi selecionada
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, image: file }));
    };

    const clearForm = () => {
        setFormData({ nome: '', marca: '', ano: '', price: '', cor: '', image: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifique se todos os campos obrigatórios estão preenchidos
        if (!formData.nome || !formData.marca || !formData.ano || !formData.price || !formData.cor || !formData.image) {
            alert('Por favor, preencha todos os campos, incluindo a imagem.');
            return;
        }
      
        const fd = new FormData();
        fd.append('nome', formData.nome);
        fd.append('marca', formData.marca);
        fd.append('ano', formData.ano);
        fd.append('price', formData.price);
        fd.append('cor', formData.cor);
        fd.append('image', formData.image); // Verifique se o arquivo está sendo enviado corretamente

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: fd,
            });

            if (!response.ok) {
                throw new Error(`Erro ao adicionar carro: ${response.status}`);
            }

            const data = await response.json();
            alert(`Carro adicionado com sucesso! ID: ${data.id}`);
            clearForm();  // Reset form after successful submission
        } catch (error) {
            console.error('Error:', error);
            alert(`Erro ao adicionar carro: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Carro</h1>
                <div className="field">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label>Marca:</label>
                    <input
                        type="text"
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label>Ano:</label>
                    <input
                        type="number"
                        name="ano"
                        value={formData.ano}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label>Preço:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label>Cor:</label>
                    <input
                        type="text"
                        name="cor"
                        value={formData.cor}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label>Imagem:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit">Adicionar Carro</button>
            </form>
            {formData.image && (
                <div className="image-preview">
                    <h3>Imagem Selecionada:</h3>
                    <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="preview-image"
                    />
                </div>
            )}
        </div>
    );
};

export default FormCarro;
