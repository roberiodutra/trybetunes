import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
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

  render() {
    const { songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <MusicCard songs={ songs } />
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
