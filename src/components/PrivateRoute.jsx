// import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './Layout';

const PrivateRoute = ({ component: Component, ...rest }) => { 
  return (
    <Layout>
      <Component {...rest} />
    </Layout>
  )
};


PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;

