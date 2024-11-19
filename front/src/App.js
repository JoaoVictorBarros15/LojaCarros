import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import FormCarro from './components/FormCarros/FormCarros';
import FormUsers from './components/FormUsers/FormUsers';
import ListCarros from './components/ListCarros/ListCarros';
import ListCatalogo from './components/Listcatalogo/ListCatalogo';

function App() {
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
    </BrowserRouter>
  );
}

export default App;