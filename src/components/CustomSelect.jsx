import Select from 'react-select';
import PropTypes from 'prop-types';

const CustomSelect = ({ field, form, options, defaultValue, ...props }) => {
  const { setFieldValue } = form;
  const { name, value } = field;
  
  console.log('defaultValue', defaultValue)
  const handleChange = (selectedOption) => {
    setFieldValue(name, selectedOption);
  };
  
  return (
    <Select
      {...field}
      {...props}
      value={options ? options.find(option => option.value ===  value || option.value === defaultValue) : ''}
      onChange={handleChange}
      options={options}
    />
  );
}

CustomSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default CustomSelect;