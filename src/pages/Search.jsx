import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const MIN_LENGTH = 2;

class Search extends React.Component {
  state = {
    disabled: true,
    name: '',
    albums: [],
    loading: false,
    artist: '',
  }

  isButtonDisabled = () => {
    this.setState(({ name }) => ({
      disabled: name.length < MIN_LENGTH,
    }));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.isButtonDisabled);
  }

  buttonClick = async () => {
    const { name } = this.state;
    this.setState({ artist: name,
      loading: true,
      albums: await searchAlbumsAPI(name) }, () => {
      this.setState({ name: '', loading: false });
    });
  }

  render() {
    const { name, disabled, albums, loading, artist } = this.state;

    let condition = '';
    if (albums.length > 0) {
      condition = (
        <p>
          {`Resultado de álbuns de: ${artist}`}
        </p>);
    } else if (albums.length === 0) {
      condition = (
        <p>
          Nenhum álbum foi encontrado
        </p>);
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            name="name"
            type="text"
            data-testid="search-artist-input"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.buttonClick }
          >
            Pesquisar

          </button>
        </form>
        {loading ? <Loading /> : condition }
        {albums.map((album) => (
          <div key={ album.collectionId }>

            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <img src={ album.artworkUrl100 } alt="albumImage" />
              <p>{album.collectionName}</p>
              <p>{album.artistName}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
