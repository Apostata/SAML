import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Menu from './components/Menu';
import Saml from './components/Saml';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Callback from './components/Callback';

const auth = new Auth();

class App extends Component {
  render() {
    console.log('opa!')
    return (
      <BrowserRouter>
        <NavBar auth={auth} />
        <Route exact path="/" component={Home} />
        <Route exact path='/menu' render={(props) => <Menu {...props} auth={auth} />} />
        <Route exact path='/saml' render={(props) => <Saml {...props} auth={auth} />} />

        <Route exact path='/callback' render={(props) => <Callback {...props} auth={auth} />} />
      </BrowserRouter>
    );
  }
}

export default App;
