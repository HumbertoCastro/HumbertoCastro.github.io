import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SaveData, fetchApi } from '../actions/Index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isButtonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange = (e) => {
    const { value, type } = e.target;
    if (type === 'text') {
      this.setState({ name: value }, () => {
        this.ValidateTest();
      });
    } else {
      this.setState({ email: value }, () => {
        this.ValidateTest();
      });
    }
  };

  ValidateTest = () => {
    const { email, name } = this.state;
    const minLength = 1;
    const re = /\S+@\S+\.\S+/;
    // refer = https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    if (name.length >= minLength && re.test(email)) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  submit() {
    const { getToken, history, storegeData } = this.props;
    const { email, name } = this.state;
    const data = {
      email,
      name,
    };
    storegeData(data);
    getToken().then(() => history.push('/settings'));
  }

  render() {
    const { email, name, isButtonDisabled } = this.state;

    return (
      <div data-testid="page-login" className="login-container">
        <form>
          <div className="wrapper">
            <span>T</span>
            <span>R</span>
            <span>Y</span>
            <span>V</span>
            <span>I</span>
            <span>A</span>
          </div>
          <h1 className="light-font">Email:</h1>
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            className="forms-input"
          />
          <h2 className="light-font">Player Name:</h2>
          <input
            type="text"
            data-testid="input-player-name"
            name="text"
            value={ name }
            className="forms-input"
            onChange={ this.handleChange }
          />
          <button
            className="light-font"
            data-testid="btn-play"
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.submit }
            id="play-button"
          >
            Lets Play!
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchApi()),
  storegeData: (data) => dispatch(SaveData(data)),
});

const mapStateToProps = (state) => ({
  tokenFetched: state.token.token,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getToken: PropTypes.func.isRequired,
  storegeData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
