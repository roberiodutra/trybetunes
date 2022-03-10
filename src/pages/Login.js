import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  onButtonClick = () => {
    const { inputName, history } = this.props;
    this.setState({ isLoading: true },
      async () => {
        const create = await createUser({ name: inputName });
        return create === 'OK' && history.push('/search');
      });
  }

  render() {
    const { inputName, onInputChange, isButton } = this.props;
    const { isLoading } = this.state;
    return isLoading ? <Loading />
      : (
        <div data-testid="page-login">
          <form>
            <label htmlFor="login-name">
              <input
                type="text"
                name="inputName"
                id="login"
                value={ inputName }
                data-testid="login-name-input"
                onChange={ onInputChange }
                placeholder="What is your name?"
              />
            </label>
            <input
              type="button"
              value="Enviar"
              disabled={ isButton }
              data-testid="login-submit-button"
              onClick={ this.onButtonClick }
            />
          </form>
        </div>
      );
  }
}

Login.propTypes = {
  inputName: PropTypes.string,
  onInputChange: PropTypes.func,
  isButton: PropTypes.bool,
}.isRequired;

export default withRouter(Login);
