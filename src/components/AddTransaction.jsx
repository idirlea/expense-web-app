import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';

import { get, post } from '../service';
import CustomDatePicker from './CustomDatePicker';
import CustomInput from './CustomInput';

import CustomSelect from './CustomSelect';

import '../styles/AddTransaction.css';

const AddTransaction = () => {
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  
  const [user, setUser] = useState({});
  const [validationMessage, setValidationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const initialValues = {
    amount: 0,
    currency: '',
    category: '',
    description: '',
    date: Date.now(),
  };
  
  useEffect(() => {
    get('categories').then(data => setCategories(data));
    get('currencies').then(data => setCurrencies(data));
    get('users/me?populate=*').then(data => setUser(data));
  }, []);

  const toggleValidationMessage = (message, type = 'success') => {
    setMessageType(type);
    setValidationMessage(message);
    setTimeout(() => {
      setValidationMessage('');
      setMessageType('');
    }, 3000);
  }

  const handleSubmit = (values, { resetForm }) => {
    if (
      values.amount && 
      values?.currency?.value && 
      values?.category?.value &&
      values.date &&
      user?.id
    ) {
      console.log(user.id);
      const data = {
        data: {
          amount: values.amount,
          currency: parseInt(values.currency.value,10),
          category: parseInt(values.category.value, 10),
          description: values.description,
          date: values.date,
          user: parseInt(user.id, 10)
        }
      };

      post('transactions', data).then(() => {
        toggleValidationMessage('Transaction added successfully');
        resetForm()
      })
      .catch(() => {
        toggleValidationMessage('Something went wrong', 'error')
      })
    }
  };

  const handleValidate = (values) => {
    const errors = {};
    
    if (!values.amount) {
      errors.amount = 'Required';
    } else if (values.amount < 0) {
      errors.amount = 'Must be positive';
    }

    if (!values.currency) {
      errors.currency = 'Required';
    }

    if (!values.category) {
      errors.category = 'Required';
    }

    return errors;
  }

  return (
    <div className='add-transaction-page'>
      <h2>Add Transaction</h2>
      <div className='validation-message' style={{
        display: validationMessage ? 'block' : 'none',
        backgroundColor: messageType === 'error' ? 'red' : 'green',
      }}>
        {validationMessage}
      </div>
      
        <Formik 
          initialValues={initialValues} 
          onSubmit={handleSubmit}
          validate={handleValidate}
        >
          <Form>
            <div className='widget'>
              <div className='form-field'>
                <label htmlFor="amount">Amount:</label>
                <Field type="number" id="amount" name="amount" component={CustomInput} />
                <ErrorMessage name="amount" component="div" />
              </div>

              <div className='form-field'>
                <label htmlFor="currency">Currency:</label>
                <Field 
                  as="select" 
                  id="currency" 
                  name="currency" 
                  component={CustomSelect}
                  options={currencies.map(currency => ({
                    value: currency.id,
                    label: currency.name,
                  }))}
                  defaultValue={user?.currency?.id} 
                />
                <ErrorMessage name="currency" component="div" />
              </div>

              <div className='form-field'>
                <label htmlFor="category">Category:</label>
                <Field 
                  as="select" 
                  id="category" 
                  name="category" 
                  component={CustomSelect} 
                  options={categories.map(({id, name}) => ({
                    value: id,
                    label: name,
                  }))} 
                />
                <ErrorMessage name="category" component="div" />
              </div>

              <div className='form-field'>
                <label htmlFor="description">Description:</label>
                <Field type="text" id="description" name="description" component={CustomInput} />
              </div>

              <div className='form-field'>
                <label htmlFor="date">Date:</label>
                <Field type="date" id="date" name="date" component={CustomDatePicker} />
              </div>
            </div>
            <button type="submit">Add Expense</button>
          </Form>
        </Formik>
      </div>
  );
};

export default AddTransaction;
