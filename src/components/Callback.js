import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Callback extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.location)
    console.log('inicio componentDidMount callback');
    this.props.auth.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    return (
      <p>Loading...</p>
    );
  }

}

export default withRouter(Callback);