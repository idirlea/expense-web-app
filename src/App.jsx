import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import PrivateRoute from './components/PrivateRoute';

// components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import Settings from './components/Settings';
import Analytics from './components/Analitics';
import TransactionsList from './components/TransactionsList';

import './styles/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    return storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false;
  });


  return (
    <Router>
      <Routes>
        <Route 
          exact path="/login"
          element={isAuthenticated ? <Navigate to='/' /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
        /> 
        <Route
          exact path="/" 
          element={<PrivateRoute component={Dashboard} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} 
        />
        <Route
          exact path="/add-transaction" 
          element={<PrivateRoute component={AddTransaction} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} 
        />
        <Route
          exact path="/transaction-list" 
          element={<PrivateRoute component={TransactionsList} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} 
        />
        <Route
          exact path="/analytics" 
          element={<PrivateRoute component={Analytics} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} 
        />
        <Route
          exact path="/settings" 
          element={<PrivateRoute component={Settings} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
