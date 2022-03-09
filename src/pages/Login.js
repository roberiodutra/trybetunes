import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
      <form>
        <label htmlFor="login-name">
          <input
            type="text"
            name="login-name"
            value={ name }
            data-testid="login-name-input"
            onChange={ this.inputChange }
            placeholder="What is your name?"
          />
        </label>
        <input
          type="button"
          value="Enviar"
          disabled={ onButton }
          data-testid="login-submit-button"
          onClick={ this.handleClick }
        />
      </form>
    </div>
    );
  }
}

export default Login;
