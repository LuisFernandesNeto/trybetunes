import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    arr: [],
  }

  async componentDidMount() {
    const {
      match: { params: { id } },
    } = this.props;

    this.setState({ arr: await getMusics(id) });
  }

  render() {
    const { arr } = this.state;

    let condition = '';
    if (arr.length > 0) {
      condition = (
        <div>
          <p data-testid="artist-name">
            {arr[0].artistName}
          </p>
          <p data-testid="album-name">
            {arr[0].collectionName}
          </p>
        </div>
      );
    }

    return (
      <div data-testid="page-album">
        <Header />
        {condition}
        {arr.map((a) => (
          <div key={ a.collectionId }>
            { a.previewUrl
            && <MusicCard
              trackId={ a.trackId }
              trackName={ a.trackName }
              previewUrl={ a.previewUrl }
              music={ a }
            />}
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
