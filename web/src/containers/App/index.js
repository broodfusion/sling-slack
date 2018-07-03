import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FourOhFour from '../../components/FourOhFour';
import Feature from '../Feature';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/feature" component={Feature} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
