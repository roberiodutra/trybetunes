import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favorites: [],
    };
  }

  componentDidUpdate() {
    this.songsFavorites();
  }

  songsFavorites = async () => {
    const songsFavorites = await getFavoriteSongs();
    this.setState({ favorites: songsFavorites });
  }

  favorited = ({ target: { id } }) => {
    const { songs } = this.props;
    const { favorites } = this.state;
    const track = songs.find((music) => music.trackId == id);
    this.setState(
      { isLoading: true },
      async () => !favorites.some((music) => music.trackId == id)
        && (await addSong(track),
        this.setState({ isLoading: false })),
    );
  }

  songsInfo = () => {
    const { songs } = this.props;
    return songs.map((music, i) => i === 0 && (
      <div key={ music.collectionId }>
        <img src={ music.artworkUrl100 } alt={ music.collectionName } />
        <p data-testid="artist-name">{music.artistName}</p>
        <p data-testid="album-name">{music.collectionName}</p>
      </div>
    ));
  }

  trackList = () => {
    const { songs } = this.props;
    const { favorites } = this.state;
    const arr = [ ...songs ];
    return arr.map((track, i) => i !== 0 && (
      <div key={ track.trackId }>
        <p>{track.trackName}</p>
        <audio
          data-testid="audio-component"
          src={ track.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorita">
          Favorita
          <input
            name="favorita"
            type="checkbox"
            data-testid={ `checkbox-music-${track.trackId}` }
            onChange={ this.favorited }
            id={ track.trackId }
            checked={ favorites.some((music) => music.trackName === track.trackName) }
          />
        </label>
      </div>
    ));
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        { isLoading ? <Loading />
          : (
            <div>
              { this.songsInfo() }
              { this.trackList() }
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.array,
}.isRequired;

export default MusicCard;
