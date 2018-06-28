import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FourOhFour from '../../components/FourOhFour';
import Home from '../Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
