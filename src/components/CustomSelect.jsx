import Select from 'react-select';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import '../styles/CustomSelect.css';

const CustomSelect = ({ 
  field, 
  form, 
  options, 
  defaultValue, 
  ...props 
}) => {
  const { setFieldValue } = form;
  const { name, value } = field;
  
  
  const handleChange = (selectedOption) => {
    setFieldValue(name, selectedOption);
  };
  
  useEffect(() => {
    if (defaultValue) {
      setFieldValue(name, options.find(option => option.value === defaultValue));
    }
  }, [defaultValue, name, options, setFieldValue]);
  
  return (
    <Select
      {...field}
      {...props}
      className="custom-react-select-container"
      classNamePrefix="my-react-select"
      onChange={handleChange}
      options={options}
    />
  );
}

CustomSelect.defaultProps = {
  defaultValue: '',
};

CustomSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
};

export default CustomSelect;