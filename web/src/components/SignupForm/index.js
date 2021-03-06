// @flow
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto'
  }
});

class SignupForm extends Component {
  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting, errorMessage } = this.props;

    return (
      <form className={`card ${css(styles.card)}`} onSubmit={handleSubmit(this.handleSubmit)}>
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
Create an account
        </h3>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
          className="form-control"
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="Email"
          className="form-control"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="Password"
          className="form-control"
        />
        <div>
          {errorMessage}
        </div>
        <button type="submit" disabled={submitting} className="btn btn-block btn-primary">
          {submitting ? 'Submitting...' : 'Sign up'}
        </button>
        <hr style={{ margin: '2rem 0' }} />
        <Link to="/login" className="btn btn-block btn-secondary">
          Login to your account
        </Link>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate
})(SignupForm);

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};
