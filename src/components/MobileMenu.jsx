import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import useAuth from '../hooks/useAuth';

import '../styles/MobileMenu.css';

const MobileMenu = () => {
  const { logout } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = (to) => {
    setTimeout(() => {
      setShowButton(false);
      setIsOpen(false);
    }, 300); 

    return navigate(to);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(isOpen);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleLogout = () => {
    logout()
    return navigate('/login');
  }

  return (
    <>
      <button className='add-btn' onClick={() => navigate('/add-transaction')} >
        <FaPlus size={20} />
      </button>
      <button className='menu-btn' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <motion.div
          className="menu-content"
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? '0%' : '-100%' }}
          transition={{ duration: 0.3 }}
        >
          {showButton && (
            <button onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}

          <ul>
            <li><span onClick={() => handleMenuItemClick('/')}>Dashboard</span></li> 
            <li><span onClick={() => handleMenuItemClick('/add-transaction')}>Add Transaction</span></li>
            <li><span onClick={() => handleMenuItemClick('/analytics')}>Analytics</span></li>
            <li><span onClick={() => handleMenuItemClick('/settings')}>Settings</span></li>
            <li><span onClick={handleLogout}>Log Out</span></li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default MobileMenu;
