import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import Settings from './components/Settings';
import Analytics from './components/Analitics';
import TransactionsList from './components/TransactionsList';

import useAuth from './hooks/useAuth';

import './styles/App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          exact path="/login"
          element={<Login />} 
        /> 
        <Route
          exact path="/" 
          element={<PrivateRoute component={Dashboard} />} 
        />
        <Route
          exact path="/add-transaction" 
          element={<PrivateRoute component={AddTransaction} />} 
        />
        <Route
          exact path="/transaction-list" 
          element={<PrivateRoute component={TransactionsList} />} 
        />
        <Route
          exact path="/analytics" 
          element={<PrivateRoute component={Analytics} />} 
        />
        <Route
          exact path="/settings" 
          element={<PrivateRoute component={Settings} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
