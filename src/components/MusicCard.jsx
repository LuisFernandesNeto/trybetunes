import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
    state ={
      favoriteSongs: [],
      loading: false,
    }

    async componentDidMount() {
      this.setState({ loading: true, favoriteSongs: await getFavoriteSongs() }, () => {
        this.setState({ loading: false });
      });
    }

    favoriteSong = ({ target }) => {
      const { name, checked } = target;
      const { music } = this.props;
      this.setState({ [name]: checked, loading: true }, async () => {
        if (checked) await addSong(music);
        else await removeSong(music);
        this.setState({ favoriteSongs: await getFavoriteSongs(), loading: false });
      });
    }

    render() {
      const { favoriteSongs, loading } = this.state;
      const { music } = this.props;
      const { trackName, previewUrl, trackId } = music;

      const some = favoriteSongs.some((favoriteSong) => (
        favoriteSong.trackId === music.trackId
      ));

      return (
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorita">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.favoriteSong }
              checked={ some }
            />
          </label>
          {loading && <Loading /> }
        </div>
      );
    }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
