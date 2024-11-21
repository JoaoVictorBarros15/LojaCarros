import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FormCar from './components/FormCar/FormCar';
import FormUsers from './components/FormUsers/FormUsers';
import ListCarros from './components/ListCarros/ListCarros';
import ListCatalogo from './components/Listcatalogo/ListCatalogo';
import Home from './components/Home/Home'; 
import Login from './components/Login/Login';
import Saiba from './components/Saiba/Saiba';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; 

function App() {
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
         <div className='app-container'>
        <Header onLogout={handleLogout} />
        <main>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route path="/saiba-mais" element={<Saiba />} /> {/* Rota para a página Saiba */}
            <Route
              path='/form-car'
              element={
                <PrivateRoute>
                  <FormCar />
                </PrivateRoute>
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
                  <ListCatalogo />
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
