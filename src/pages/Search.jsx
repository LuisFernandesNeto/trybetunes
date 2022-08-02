import React from 'react';
import Header from '../components/Header';

const MIN_LENGTH = 2;

class Search extends React.Component {
  state = {
    disabled: true,
    name: '',
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

  render() {
    const { name, disabled } = this.state;
    return (
      <div data-testid="page-search">
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
          >
            Pesquisar

          </button>
        </form>
        <Header />
        <p>Search</p>
      </div>
    );
  }
}

export default Search;
