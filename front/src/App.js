import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FormCarro from './components/FormCarros/FormCarros';
import FormUsers from './components/FormUsers/FormUsers';
import ListCarros from './components/ListCarros/ListCarros';
import ListCatalogo from './components/Listcatalogo/ListCatalogo';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home';

function App() {
  const [, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

   // Array de veículos
   const veiculos = [
    {
      nome: 'RAM 1500 Limited',
      preco: 'R$ 350.000,00',
      imagem: 'https://carrosbemmontados.com.br/wp-content/uploads/2024/07/RAM-1500-Limited-2024-4.png',
    },
    {
      nome: 'RAM 2500 Laramie',
      preco: 'R$ 400.000,00',
      imagem: 'data:image/jpeg;base64,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',
    },
    {
      nome: 'RAM 3500 Heavy Duty',
      preco: 'R$ 450.000,00',
      imagem: 'https://quatrorodas.abril.com.br/wp-content/uploads/2021/08/ram_3500_limited_crew_cab_59-e1628699816107.jpeg?quality=70&strip=info&w=720&crop=1',
    },
  ];

  return (
    <BrowserRouter>
      <div className='app-container'>
        <Header onLogout={handleLogout} />
        <main>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
  <Route
    path="/form-carros"
    element={
      <PrivateRoute>
        <FormCarro />
      </PrivateRoute>
    }
  />
  <Route
    path="/form-users"
    element={
      <PrivateRoute>
        <FormUsers />
      </PrivateRoute>
    }
  />
  <Route
    path="/list-carros"
    element={
      <PrivateRoute>
        <ListCarros />
      </PrivateRoute>
    }
  />
            <Route
              path="/list-catalogo"
              element={
                <PrivateRoute>
                  {/* Passa o array de veículos como props para o ListCatalogo */}
                  <ListCatalogo veiculos={veiculos} />
                </PrivateRoute>
              }
            />

</Routes>

        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;