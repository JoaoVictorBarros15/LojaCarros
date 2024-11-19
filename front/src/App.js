import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
<<<<<<< HEAD
import FormCar from './components/FormCar/FormCar';
=======
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import FormCarro from './components/FormCarros/FormCarros';
>>>>>>> e70a3059663a21747598e6556db358a0e3fb120f
import FormUsers from './components/FormUsers/FormUsers';
import ListCarros from './components/ListCarros/ListCarros';
import ListCatalogo from './components/Listcatalogo/ListCatalogo';

function App() {
<<<<<<< HEAD
  const [veiculos, setVeiculos] = useState([
    {
      nome: 'RAM 1500 Limited',
      preco: 'R$ 350.000,00',
      imagem: 'https://carrosbemmontados.com.br/wp-content/uploads/2024/07/RAM-1500-Limited-2024-4.png',
    },
    {
      nome: 'RAM 2500 Laramie',
      preco: 'R$ 400.000,00',
      imagem: 'https://quatrorodas.abril.com.br/wp-content/uploads/2021/08/ram_3500_limited_crew_cab_59-e1628699816107.jpeg?quality=70&strip=info&w=720&crop=1',
    },
    {
      nome: 'RAM 3500 Heavy Duty',
      preco: 'R$ 450.000,00',
      imagem: 'https://quatrorodas.abril.com.br/wp-content/uploads/2021/08/ram_3500_limited_crew_cab_59-e1628699816107.jpeg?quality=70&strip=info&w=720&crop=1',
    },
  ]);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const fetchCars = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/cars');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      console.log(data); // Verifique o formato dos dados recebidos
  
      // Atualiza a lista de veículos com os dados recebidos do servidor
      const updatedVeiculos = data.cars.map(car => ({
        nome: car.modelo,
        preco: `R$ ${car.preco}`,
        imagem: car.image, // Verifique se a URL da imagem está sendo retornada corretamente
      }));
  
      // Combine a lista de veículos de exemplo com os carros do banco de dados
      setVeiculos(prevVeiculos => {
        const allVeiculos = [
          ...prevVeiculos, // veículos de exemplo
          ...updatedVeiculos // veículos do banco de dados
        ];
        return allVeiculos;
      });
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }, []);


  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <BrowserRouter>
      <div className='app-container'>
        <Header onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route
              path='/form-car'
              element={
                <PrivateRoute>
                  <FormCar onCarAdded={fetchCars} />
                </PrivateRoute>
              }
            />
            <Route
              path='/form-users'
              element={
                <PrivateRoute>
                  <FormUsers />
                </PrivateRoute>
              }
            />
            <Route
              path='/list-carros'
              element={
                <PrivateRoute>
                  <ListCarros />
                </PrivateRoute>
              }
            />
            <Route
              path='/list-catalogo'
              element={
                <PrivateRoute>
                  <ListCatalogo veiculos={veiculos} />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
=======
  const [veiculos, setVeiculos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = () => {
    setToken(localStorage.getItem('token'));
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header onLogout={handleLogout} />
              <main>
                <Home />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/form-users"
          element={
            <div>
              <FormUsers />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Login onLogin={handleLogin} />
            </div>
          }
        />
        <Route
          path="/form-carros"
          element={
            <PrivateRoute>
              <div>
                <Header onLogout={handleLogout} />
                <main>
                  <FormCarro />
                </main>
                <Footer />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/list-carros"
          element={
            <PrivateRoute>
              <div>
                <Header onLogout={handleLogout} />
                <main>
                  <ListCarros />
                </main>
                <Footer />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/list-catalogo"
          element={
            <PrivateRoute>
              <div>
                <Header onLogout={handleLogout} />
                <main>
                  <ListCatalogo veiculos={veiculos} />
                </main>
                <Footer />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
>>>>>>> e70a3059663a21747598e6556db358a0e3fb120f
    </BrowserRouter>
  );
}

export default App;
