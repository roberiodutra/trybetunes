import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    return (
      <header data-testid="header-component">Header</header>
    );
  }
}

export default withRouter(Header);
