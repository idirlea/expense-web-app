import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './Layout';

const PrivateRoute = ({ component: Component, setIsAuthenticated, isAuthenticated, ...rest }) => isAuthenticated ? (
  <Layout setIsAuthenticated={setIsAuthenticated}>
    <Component 
      isAuthenticated={isAuthenticated} 
      {...rest} 
    />
  </Layout>
) : (
  <Navigate to="/login" />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired
};

export default PrivateRoute;

