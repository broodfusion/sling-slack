// @flow
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session';
import Navbar from '../../components/Navbar';
import SignupForm from '../../components/SignupForm';

class Signup extends Component {
  handleSignup = (data) => {
    this.props.signup(data);
  };

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

export default connect(
  null,
  { signup }
)(Signup);

Signup.propTypes = {
  signup: PropTypes.func.isRequired
};
