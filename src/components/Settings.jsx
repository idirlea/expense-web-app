import { Formik, Form, Field, ErrorMessage } from 'formik';

import CustomSelect from './CustomSelect';
import CustomInput from './CustomInput';

import { get, post } from '../service';

import '../styles/Form.css';
import { useEffect, useState } from 'react';

const Settings = () => {
  const [currencies, setCurrencies] = useState([]);
  const [user, setUser] = useState({});

  const handleValidate = (values) => {
    const errors = {};

    if (!values.currentPassword) {
      errors.currentPassword = 'Required';
    } 

    if (!values.newPassword) {
      errors.newPassword = 'Required';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    }

    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

  };

  const handlePasswordSubmit = (values, { resetForm }) => {
    post('/auth/change-password', values).then(() => {
      resetForm();
    }).catch(() => {
      console.log('Something went wrong');
    })
  };
  
  const handleCurrencySubmit = (values, { resetForm }) => {
    post('/auth/change-currency', values).then(() => {
      resetForm();
    }).catch(() => {
      console.log('Something went wrong');
    })
  }

  useEffect(() => {
    document.title = 'Settings';

    get('currencies').then(data => {
      setCurrencies(data.map(currency => ({
        value: currency.id,
        label: currency.name,
      })));
    }).catch(error => {
      console.error(error);
    });


    get('users/me?populate=*').then(data => {
      setUser(data);
    }
    ).catch(error => {
      console.error(error);
    });
  }
  , []);

  return (
    <div>
      <h2>Settings</h2>
      <div className='settings-wrapper' style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        <div className="widget" style={{alignItems: 'flex-start'}}>
          <h2>Change Password</h2>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validate={handleValidate}
            onSubmit={handlePasswordSubmit}
          >
            <Form>
              <div className='form-field'>
                <label htmlFor="currentPassword">Current Password</label>
                <Field
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  component={CustomInput}
                />
                <ErrorMessage name="currentPassword" component="div" />
              </div>
              <div className='form-field'>
                <label htmlFor="newPassword">New Password</label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  component={CustomInput}
                />
                <ErrorMessage name="newPassword" component="div" />
              </div>
              <div className='form-field'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  component={CustomInput}
                />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
              <button type="submit">Change</button>
            </Form>
          </Formik>
        </div>
        <div className="widget" style={{alignItems: 'flex-start'}}>
          <h2>Default currency</h2>
          <Formik
            initialValues={{
              currency: '',
            }}
            onSubmit={handleCurrencySubmit}
          >
            <Form style={{width: '100%'}}>
              <div className='form-field' style={{width: '100%'}}>
                <label htmlFor="currency">Currency:</label>
                <Field
                  component={CustomSelect}
                  id="currency"
                  name="currency"
                  options={currencies}
                  style={{width: '100%'}}
                  value={user?.currency?.id}
                />
              </div>
              <button style={{width: '100%', marginTop: '10px'}} type="submit">Change</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Settings;
