import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  input, label, type, placeholder, style, meta
}) => (
  <div style={{ marginBottom: '1rem' }}>
    {label && (
    <label htmlFor={input.name}>
      {label}
    </label>
    )}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control"
      style={style && style}
    />
    {meta.touched
      && meta.error && (
      <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>
        {meta.error}
      </div>
    )}
  </div>
);

export default Input;

Input.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  meta: PropTypes.object
};

// type Props = {
//   input: Object,
//   label?: string,
//   type?: string,
//   placeholder?: string,
//   style?: Object,
//   meta: Object
// };
