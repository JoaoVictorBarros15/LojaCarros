import React, { useState } from 'react';
import './FormCarros.css';

const url = 'http://localhost:3000/cars';

const FormCar = ({ onCarAdded }) => {
  const [formData, setFormData] = useState({
    modelo: '',
    ano: '',
    cor: '',
    preco: '',
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
    setFormData({ modelo: '', ano: '', cor: '', preco: '', image: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('modelo', formData.modelo);
    formDataToSend.append('ano', formData.ano);
    formDataToSend.append('cor', formData.cor);
    formDataToSend.append('preco', formData.preco);
    if (formData.image) {
        formDataToSend.append('image', formData.image); // Enviando a imagem para o servidor
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formDataToSend,
        });
        if (!response.ok) {
            throw new Error('Failed to add car');
        }
        const data = await response.json();
        alert(`Car added successfully! ID: ${data.id}`);
        // Atualizar a lista de carros disponíveis
        onCarAdded();  // Chama a função para buscar os carros atualizados
        clearForm();
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding car');
    }
};

  return (
    <div className='form-container'>
      <div className='form-panel'>
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <label>Modelo:</label>
            <input
              type='text'
              name='modelo'
              value={formData.modelo}
              onChange={handleChange}
              required
            />
          </div>
          <div className='field'>
            <label>Ano:</label>
            <input
              type='number'
              name='ano'
              value={formData.ano}
              onChange={handleChange}
              required
            />
          </div>
          <div className='field'>
            <label>Cor:</label>
            <input
              type='text'
              name='cor'
              value={formData.cor}
              onChange={handleChange}
              required
            />
          </div>
          <div className='field'>
            <label>Preço:</label>
            <input
              type='number'
              step='0.01'
              name='preco'
              value={formData.preco}
              onChange={handleChange}
              required
            />
          </div>
          <div className='field'>
            <label>Imagem:</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleImageChange}
            />
          </div>
          <button type='submit'>Adicionar Carro</button>
        </form>
      </div>
      <div className='image-panel'>
        {formData.image && (
          <div className='image-preview'>
            <h3>Imagem Selecionada:</h3>
            <img
              src={URL.createObjectURL(formData.image)}
              alt='Preview'
              className='preview-image'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCar;
