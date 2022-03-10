import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  inputButton = () => {
    const { onInputChange, isButton, inputName, onHandleClick } = this.props;
    return (
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
          onClick={ onHandleClick }
        >
          Search
        </button>
      </div>
    );
  }

  searchResult = () => {
    const { searchName, albumSearch } = this.props;
    return (
      <div>
        <h3>{`Resultado de álbuns de: ${searchName}`}</h3>
        {albumSearch.map((artist) => (
          <div key={ artist.collectionId }>
            <Link
              to={ `/album/${artist.collectionId}` }
              data-testid={ `link-to-album-${artist.collectionId}` }
            >
              { artist.collectionName }
            </Link>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { albumSearch, isLoading, isSearch } = this.props;
    const notFound = 'Nenhum álbum foi encontrado';

    return (
      <div data-testid="page-search">
        <Header />
        { !isLoading ? (this.inputButton()) : <Loading /> }
        { albumSearch.length > 0 && (this.searchResult()) }
        { isSearch && albumSearch.length === 0 && <h3>{notFound}</h3> }
      </div>
    );
  }
}

Search.propTypes = {
  inputName: PropTypes.string,
  onInputChange: PropTypes.func,
  isButton: PropTypes.bool,
  onHandleClick: PropTypes.func,
  searchName: PropTypes.string,
  albumSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  isSearch: PropTypes.bool,
}.isRequired;

export default Search;
