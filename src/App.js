import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile, ProfileEdit, NotFound } from './comp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      isButton: true,
    };
  }

  onInputChange = ({ target: { name, value, id } }) => (id === 'login'
    ? this.setState({ [name]: value }, this.validate(2))
    : this.setState({ [name]: value }, this.validate(1)));

  validate = (number) => {
    const { inputName } = this.state;
    const MIN = number;
    return (inputName.length >= MIN)
      ? this.setState({ isButton: false })
      : this.setState({ isButton: true });
  }

  login = () => {
    const { inputName, isButton } = this.state;
    return (<Login
      onInputChange={ this.onInputChange }
      inputName={ inputName }
      isButton={ isButton }
    />);
  }

  search = () => {
    const { inputName, isButton } = this.state;
    return (<Search
      onInputChange={ this.onInputChange }
      inputName={ inputName }
      isButton={ isButton }
    />);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ this.login } />
            <Route exact path="/search" component={ this.search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
