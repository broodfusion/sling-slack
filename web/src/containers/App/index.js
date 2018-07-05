import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { signout } from '../../actions/session';
import FourOhFour from '../../components/FourOhFour';
import Sidebar from '../../components/Sidebar';
import Signout from '../../components/Signout';
// import Feature from '../Feature';
import requireAuth from '../HoC/requireAuth';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';

class App extends Component {
  render() {
    (function() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common['authorization'] = null;
        /*if setting null does not remove `Authorization` header then try     
            delete axios.defaults.headers.common['Authorization'];
          */
      }
    })();
    return (
      <Router>
        <div style={{ display: 'flex', flex: '1' }}>
          <Sidebar
            rooms={this.props.currentUserRooms}
            onLogoutClick={this.props.signout}
          />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={requireAuth(Home)} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ rooms }) {
  return {
    currentUserRooms: rooms.currentUserRooms
  };
}

export default connect(
  mapStateToProps,
  { signout }
)(App);
