import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      songs: await getMusics(id),
    });
  }

  songsInfo = () => {
    const { songs } = this.state;
    return songs.map((music, i) => i === 0 && (
      <div>
        <img src={ music.artworkUrl100 } alt={ music.collectionName } />
        <p data-testid="artist-name">{music.artistName}</p>
        <p data-testid="album-name">{music.collectionName}</p>
      </div>
    ));
  }

  trackList = () => {
    const { songs } = this.state;
    return songs.map((tracks, i) => i > 0 && (
      <div key={ tracks.trackId }>
        <p>{tracks.trackName}</p>
        <audio
          data-testid="audio-component"
          src={ tracks.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    ));
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        { this.songsInfo() }
        { this.trackList() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
