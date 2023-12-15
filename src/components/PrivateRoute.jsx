import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './Layout';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => isAuthenticated ? (
  <Layout>
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
};

export default PrivateRoute;

