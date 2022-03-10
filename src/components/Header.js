import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true },
      async () => {
        const user = await getUser();
        this.setState({
          isLoading: false,
          userName: user.name,
        });
      });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading
          ? <Loading />
          : <span data-testid="header-user-name">{userName}</span>}
      </header>
    );
  }
}

export default Header;
