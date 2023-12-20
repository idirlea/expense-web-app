import PropTypes from 'prop-types';
import Menu from './Menu';

import '../styles/Layout.css';

import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import { Link } from 'react-router-dom';

import { FaReceipt } from 'react-icons/fa';


const iconStyle = {
  display: 'flex', 
  color: '#000', 
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
}


const Layout = ({ children, setIsAuthenticated }) => {
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
          <FaReceipt size={28} />
        </Link>
        {isMobile ? <MobileMenu setIsAuthenticated={setIsAuthenticated} /> : <Menu setIsAuthenticated={setIsAuthenticated} />}
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
