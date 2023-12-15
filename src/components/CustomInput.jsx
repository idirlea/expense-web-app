
import PropTypes from 'prop-types';

const CustomInput = ({ field, form, ...props }) => {
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const className = showError ? 'error' : '';

  return (
    <div>
      <input {...field} {...props} className={className} />
    </div>
  );
};

CustomInput.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default CustomInput;
