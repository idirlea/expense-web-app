import { Formik, Form, Field } from 'formik';
import CustomInput from './CustomInput';

import '../styles/Login.css';

import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { login, isAuth } = useAuth();

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

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className='login-wrapper'>
      <div className='title'>
        <span>Login</span>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={login}
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


export default Login;
