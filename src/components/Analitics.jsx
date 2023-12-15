import { Field, Formik, Form } from "formik";
import { startOfMonth, endOfMonth, format } from 'date-fns';
import PropTypes from "prop-types";
import qs from "qs";

import { get } from "../service";
import { useEffect, useState } from "react";

import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";
import TransactionsList from "./TransactionsList";

const FilterView = ({ onSubmit }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    get('categories').then(data => setCategories(data.map(category => ({
        value: category.id,
        label: category.name,
      })),
    ));
  }, []);

  return (
    <Formik
      initialValues={{ 
        startDate: startOfMonth(new Date()), 
        endDate: endOfMonth(new Date()), 
        category: [] }
      }
      onSubmit={onSubmit}
    >  
      <Form style={{width: '100%'}}>
        <div className='form-field'>
          <label htmlFor="startDate">Start Date:</label>
          <Field name="startDate" id="startDate" component={CustomDatePicker} />
        </div>
        <div className='form-field'>
          <label htmlFor="endDate">End Date:</label>
          <Field name="endDate"  id="endDate" component={CustomDatePicker} />
        </div>
        <div className='form-field'>
          <label htmlFor="category">Category:</label>
          <Field 
            id="category" 
            name="category" 
            options={categories} 
            component={CustomSelect} 
            isMulti={true}
          />   
        </div>
        <button style={{marginTop: '10px', width: '100%'}} type="submit">Submit</button>
      </Form> 
    </Formik>
  );
}

FilterView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const Analytics = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (values, { resetForm }) => {
    const { startDate, endDate, category } = values;
    
    const query = qs.stringify({
      filters: {
      date: {
        $gte: format(startDate, 'yyyy-MM-dd'),
        $lte: format(endDate, 'yyyy-MM-dd'),
      },
      category: {
        $in: category.map(({ value }) => value),
      },
    }});

    setQuery(query);
    
    resetForm();
  };

  return (
    <>
      <h2>Analytics</h2>
      <div className="widget" style={{alignItems: 'flex-start'}}>
        <FilterView onSubmit={handleSubmit} />
      </div>
      <TransactionsList query={query} />
    </>
  );
};

export default Analytics;
