import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      img: '',
    };
    this.renderDados = this.renderDados.bind(this);
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  componentDidMount() {
    this.renderDados();
  }

  btnClickLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  btnClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  renderFeedback() {
    const { questionsCorrect } = this.props;
    console.log(questionsCorrect);
    const media = 3;
    if (questionsCorrect < media) {
      return (<p data-testid="feedback-text">Could be better...</p>);
    }
    if (questionsCorrect === media) {
      return (<p data-testid="feedback-text">Well Done!</p>);
    }
    if (questionsCorrect > media) {
      return (<p data-testid="feedback-text">Well Done!</p>);
    }
  }

  renderDados() {
    const { email } = this.props;
    // console.log(email);
    const hash = md5(email).toString();
    this.setState({ img: `https://www.gravatar.com/avatar/${hash}` });
  }

  render() {
    const { img } = this.state;
    const { name, score, questionsCorrect } = this.props;
    return (
      <>
        <div>
          <img data-testid="header-profile-picture" src={ img } alt="profile" />
          <h1 data-testid="header-player-name">{name}</h1>
          <p data-testid="header-score">{score}</p>
          <div>{this.renderFeedback()}</div>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{ questionsCorrect }</p>
        </div>
        {/* <div>
          <p data-testid="feedback-total-question">{ `Correct questions ${score}` }</p>
          <p data-testid="feedback-total-score">{ `Total score ${score * 2}` }</p>
        </div> */}
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.btnClickLogin }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.btnClickRanking }
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  questionsCorrect: state.player.questionsCorrect,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  questionsCorrect: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
