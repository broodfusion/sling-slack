import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/session';

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
  }
  render() {
    return (
      <div>
        <h3>Sorry to see you go...</h3>
        <div>
          <Link to="/">Sign in</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { signout }
)(Signout);
