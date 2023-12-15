import { Link } from 'react-router-dom';

import '../styles/Menu.css';


const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/add-expense">Add Expense</Link></li>
        <li><Link to="/analitycs">Analytics</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li>Log Out</li>
      </ul>
    </nav>
  )
}

export default Menu;