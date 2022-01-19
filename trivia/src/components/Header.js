import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { getGravatarImage } from '../actions/Index';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      img: 'https//',
      loading: true,
    };
    this.renderDados = this.renderDados.bind(this);
    this.renderStruct = this.renderStruct.bind(this);
  }

  componentDidMount() {
    this.renderDados();
  }

  renderDados() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ img: `https://www.gravatar.com/avatar/${hash}`, loading: false }, () => {
      const { img } = this.state;
      const { getImage } = this.props;
      getImage(img);
    });
  }

  renderStruct() {
    const { email, name, score } = this.props;
    const { img } = this.state;
    return (
      <div>
        <h1>{ email }</h1>
        <h2 data-testid="header-player-name">{ name }</h2>
        <p data-testid="header-score">{ score }</p>
        <img
          alt="imagemJogador"
          src={ img }
          width="100px"
          height="100px"
          data-testid="header-profile-picture"
        />
      </div>);
  }

  render() {
    const { loading } = this.state;
    return (loading ? null : this.renderStruct());
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  getImage: (url) => dispatch(getGravatarImage(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  getImage: PropTypes.func.isRequired,
};
