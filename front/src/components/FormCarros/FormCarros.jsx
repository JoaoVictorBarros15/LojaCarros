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
        image: '' 
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
        setFormData({ nome: '', marca: '', ano: '', price: '', cor: '', image: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('nome', formData.nome);
        formData.append('marca', formData.marca);
        formData.append('ano', formData.ano);
        formData.append('price', formData.price);
        formData.append('cor', formData.cor);
        if (formData.image) {
          formData.append('image', formData.image);
        }
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          if (!response.ok) {
            throw new Error(`Erro ao adicionar carro: ${response.status}`);
          }
      
          const data = await response.json();
      
          alert(`Carro adicionado com sucesso! ID: ${data.id}`);
      
          clearForm();
        } catch (error) {
          console.error('Error:', error);
      
          // Verificando se o erro é um objeto com uma propriedade message
          if (error instanceof Error) {
            alert(`Erro ao adicionar carro: ${error.message}`);
          } else {
            // Caso o erro seja um objeto não instanciado da classe Error, exibe uma mensagem genérica
            alert('Erro desconhecido ao adicionar carro');
          }
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
