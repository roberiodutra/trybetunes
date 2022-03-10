import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArtist: '',
      isButton: true,
    };
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validate);
  };

  validate = () => {
    const { searchArtist } = this.state;
    const MIN = 2;
    return (searchArtist.length >= MIN)
      ? this.setState({ isButton: false })
      : this.setState({ isButton: true });
  }

  render() {
    const { isButton, searchArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchArtist }
            name="searchArtist"
            placeholder="Artist Name"
            onChange={ this.onInputChange }
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

export default Search;
