import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FormCar from './components/FormCar/FormCar';
import FormUsers from './components/FormUsers/FormUsers';
import ListCarros from './components/ListCarros/ListCarros';
import ListCatalogo from './components/Listcatalogo/ListCatalogo';
import Home from './components/Home/Home'; 
import Login from './components/Login/Login';
import Saiba from './components/Saiba/Saiba';  // Certifique-se de importar o componente Saiba
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
          path="/form-car"
          element={
            <PrivateRoute>
              <div>
                <Header onLogout={handleLogout} />
                <main>
                  <FormCar />
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
                  <ListCatalogo />
                </main>
                <Footer />
              </div>
            </PrivateRoute>
          }
        />
        
        {/* Nova rota para a página "Saiba Mais" */}
        <Route
          path="/saiba-mais"
          element={
            <div>
              <Header onLogout={handleLogout} />
              <main>
                <Saiba />
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
