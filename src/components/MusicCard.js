import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

  favorited = async ({ target: { name, checked } }) => {
    const { songs } = this.props;
    const track = songs.filter((music) => music.trackName === name);
    this.setState(() => ({ isLoading: true }));
    return (checked) ? (await addSong(...track)
      && this.setState(() => ({ isLoading: false })))
      : (await removeSong(...track)
      && this.setState(() => ({ isLoading: false })));
  }

  trackList = () => {
    const { songs } = this.props;
    const { favorites } = this.state;
    const arr = [...songs];
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
            name={ track.trackName }
            type="checkbox"
            data-testid={ `checkbox-music-${track.trackId}` }
            onChange={ this.favorited }
            id={ track.trackId }
            checked={ favorites.some((music) => music.trackId === track.trackId) }
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
