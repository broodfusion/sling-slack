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

class LoginForm extends Component {
  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting, errorMessage } = this.props;

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Login to Sling
        </h3>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="Password"
        />
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : (
          ''
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-block btn-primary"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
        <hr style={{ margin: '2rem 0' }} />
        <Link to="/signup" className="btn btn-block btn-secondary">
          Create a new account
        </Link>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'login',
  validate
})(LoginForm);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
