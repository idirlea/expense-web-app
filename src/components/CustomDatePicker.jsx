import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ field, form, ...props }) => {
  const { setFieldValue } = form;
  const { name } = field;
  
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(name, val);
      }}
    />
  );
};

CustomDatePicker.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default CustomDatePicker;

