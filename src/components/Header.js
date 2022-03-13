import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  navLinks = () => {
    const arr = ['search', 'favorites', 'profile'];
    return arr.map((el) => (
      <li key={ el }>
        <Link
          to={ `/${el}` }
          data-testid={ `link-to-${el}` }
        >
          { el.toUpperCase() }
        </Link>
      </li>));
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading
          ? <Loading />
          : <span data-testid="header-user-name">{userName}</span>}
        <nav>
          <ul>{this.navLinks()}</ul>
        </nav>
      </header>
    );
  }
}

export default Header;
