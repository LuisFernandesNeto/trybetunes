import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN_LENGTH = 3;

class Login extends React.Component {
    state = {
      disabled: true,
      name: '',
      loading: false,
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
      const { history } = this.props;
      this.setState({ loading: true });
      const { name } = this.state;
      await createUser({ name });
      history.push('/search');
    }

    render() {
      const { name, disabled, loading } = this.state;

      return (
        <div data-testid="page-login">
          <form>
            <input
              name="name"
              type="text"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ disabled }
              onClick={ this.buttonClick }
            >
              Entrar

            </button>
            {loading && <Loading />}
          </form>
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
