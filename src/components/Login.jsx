import { Formik, Form, Field } from 'formik';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import CustomInput from './CustomInput';

import '../styles/Login.css';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const initialValues = {
    email: '',
    password: ''
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
      errors.username = 'Email is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  useEffect(() => {
    // Check if the user is already logged in (e.g., after a page refresh)
    const loggedIn = localStorage.getItem('isAuthenticated');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  const handleLogin = (values) => {
    axios.post('http://expense.code-school.eu/api/auth/local/', {
      identifier:  values.email,
      password: values.password,
    })
      .then(response => {
        if (response.data.jwt) {
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('jwt', response.data.jwt);

          redirect('/');
        }
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };
  


  return (
    <div className='login-wrapper'>
      <div className='title'>
        <span>Login</span>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validate={validateForm}
      >
        <Form>
          <div>
            <Field 
              type="text" 
              id="email" 
              name="email" 
              placeholder="Enter email" 
              component={CustomInput}
            />
          </div>
          <div>
            <Field 
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              component={CustomInput}
            />
          </div>

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired
}

export default Login;
