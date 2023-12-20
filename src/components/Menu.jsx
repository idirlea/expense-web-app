import { Link, redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Menu.css';


const Menu = ({ setIsAuthenticated }) => {

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('jwt');

    redirect('/login');
  }

  return (
    <nav>
      <ul>
        <li><Link to="/add-expense">Add Expense</Link></li>
        <li><Link to="/analitycs">Analytics</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li onClick={handleLogout}>Log Out</li>
      </ul>
    </nav>
  )
}

Menu.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired
}

export default Menu;