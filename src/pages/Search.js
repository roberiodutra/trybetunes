import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { onInputChange, isButton, inputName } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            id="search"
            value={ inputName }
            name="inputName"
            placeholder="Artist Name"
            onChange={ onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButton }
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  inputName: PropTypes.string,
  onInputChange: PropTypes.func,
  isButton: PropTypes.bool,
}.isRequired;

export default Search;
