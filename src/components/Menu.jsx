import { Link, redirect } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import '../styles/Menu.css';

const Menu = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout()  
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

export default Menu;