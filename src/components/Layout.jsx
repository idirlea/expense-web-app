import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaReceipt } from 'react-icons/fa';

import Menu from './Menu';
import MobileMenu from './MobileMenu';

import '../styles/Layout.css';

const iconStyle = {
  display: 'flex', 
  color: '#000', 
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
}


const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='wrapper'>
      <header>
        <Link 
          style={iconStyle} 
          to="/"
        >
          <FaReceipt className='logo-icon' size={28} />
        </Link>
        {isMobile ? <MobileMenu /> : <Menu />}
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
