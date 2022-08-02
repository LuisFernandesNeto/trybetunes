import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
    state = {
      user: {},
      loading: true,
    }

    async componentDidMount() {
      this.setState({ loading: true, user: await getUser() }, () => {
        this.setState({ loading: false });
      });
    }

    render() {
      const { loading, user } = this.state;
      const { name } = user;
      return (
        <header data-testid="header-component">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Favorites</Link>
          <div data-testid="header-user-name">
            {loading ? <Loading /> : name}
          </div>
        </header>
      );
    }
}

export default Header;
