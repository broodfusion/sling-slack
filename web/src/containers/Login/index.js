// @flow
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/Navbar';

class Login extends Component {
  handleLogin = data =>
    this.props.login(data, () => {
      this.props.history.push('/home');
    });

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <LoginForm
          onSubmit={this.handleLogin}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    errorMessage: auth.errorMessage
  };
}

export default connect(
  mapStateToProps,
  { login }
)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired
};
