import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favorites: [],
    };
  }

  favorited = async ({ target: { checked, id } }) => {
    const { songs } = this.props;
    this.setState({ isLoading: true },
      async () => {
        if (checked) await addSong(songs);
        this.setState((prevState) => ({
          favorites: [...prevState.favorites, id], isLoading: false,
        }));
      });
  }

  isChecked = (checkId) => {
    const { favorites } = this.state;
    return favorites.some((el) => el === checkId.toString());
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
    return songs.map((track, i) => i > 0 && (
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
            checked={ this.isChecked(track.trackId) }
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
