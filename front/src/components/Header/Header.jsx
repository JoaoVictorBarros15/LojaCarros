import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ onLogout }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout(); 
        navigate('/login'); 
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Titanium Motors</Link>
            </div>
            <nav>
                <ul className="nav-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/form-car">Venda seu Carro</Link></li>
                    <li><Link to="/list-carros">Consulta Carros</Link></li>
                    <li><Link to="/list-catalogo">Veiculos Disponiveis</Link></li>
                    <li><Link to="/saibamais">Saiba Mais</Link></li>
                    <li>
                        {token ? (
                            <button className="auth-btn" onClick={handleLogout}>Logout</button>
                        ) : (
                            <button className="auth-btn" onClick={() => navigate('/login')}>Login</button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
