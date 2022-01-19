import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shuffle from '../services/shuffle';
import { fetchApi,
  updateIndex as update,
  updateButtons,
  updateScore as scoreUpdate } from '../actions/Index';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      perguntas: '',
      loading: true,
      isButtonDisabled: true,
      isColor: false,
      tempoRestante: 30,
    };
    this.request = this.request.bind(this);
    this.keepResp = this.keepResp.bind(this);
    this.secRequest = this.secRequest.bind(this);
    this.renderPerguntas = this.renderPerguntas.bind(this);
    this.respondeu = this.respondeu.bind(this);
  }

  componentDidMount() {
    this.request();
  }

  componentDidUpdate() {
    const { index, history, settings } = this.props;
    const maxLength = settings.questions;
    if (index === maxLength) {
      history.push('/feedback');
    }
  }

  respondeu() {
    this.setState({ isButtonDisabled: true, isColor: false }, () => {
      const { updateIsRespDisabled } = this.props;
      updateIsRespDisabled();
    });

    const { history, index, updateIndex, settings } = this.props;

    const maxLength = settings.questions - 1;
    if (index < maxLength) {
      updateIndex();
    } else {
      const { name, score, url } = this.props;
      const playerInfos = JSON.parse(localStorage.getItem('ranking'))
        ? JSON.parse(localStorage.getItem('ranking')) : [];
      const matchData = {
        name, score, url,
      };
      playerInfos.push(matchData);
      localStorage.setItem('ranking', JSON.stringify(playerInfos));
      history.push('/feedback');
    }
  }

  request() {
    const { settings } = this.props;
    const defaulC = '9';
    const defaulD = 'easy';
    const defaultQ = '5';
    const { category = defaulC, difficulty = defaulD, questions = defaultQ } = settings;
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=multiple&token=${token}`)
      .then((r) => r.json()).then((perguntas) => {
        const invalidateToken = 3;
        if (perguntas.response_code === invalidateToken) {
          this.secRequest();
        } else {
          this.setState({ perguntas, loading: false });
        }
      });
  }

  secRequest() {
    const { getToken, settings } = this.props;
    const defaulC = '9';
    const defaulD = 'easy';
    const defaultQ = '5';
    const { category = defaulC, difficulty = defaulD, questions = defaultQ } = settings;
    getToken();
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}$type=multiple&token=${token}`)
      .then((r) => r.json()).then((perguntas) => {
        const invalidateToken = 3;
        if (perguntas.response_code !== invalidateToken) {
          this.setState({ perguntas, loading: false });
        } else {
          this.secRequest();
        }
      });
  }

  keepResp({ target }) {
    const { innerText: resposta } = target;
    const { perguntas: { results: perguntas } } = this.state;
    const { timer, updateScore, index } = this.props;
    if (perguntas[index].correct_answer === resposta) {
      const { tempoRestante } = this.state;
      let coeficiente = 0;
      const TRES = 3;
      switch (perguntas[index].dificulty) {
      case 'easy': coeficiente = 1;
        break;
      case 'medium': coeficiente = 2;
        break;
      case 'hard': coeficiente = TRES;
        break;
      default: coeficiente = 1;
      }
      const NUMBER_TEN = 10;
      const score = NUMBER_TEN + (coeficiente * tempoRestante);
      updateScore(score);
    }
    this.setState({ isColor: true,
      isButtonDisabled: false,
      tempoRestante: timer }, () => {
      const { updateIsRespDisabled } = this.props;
      updateIsRespDisabled();
    });
  }

  renderPerguntas() {
    const { isColor,
      perguntas,
      isButtonDisabled,
    } = this.state;
    const { index, isRespDisabled } = this.props;
    const {
      category,
      dificulty,
      question,
    } = perguntas.results[index];
    const Alternativas = [perguntas.results[index].correct_answer,
      ...perguntas.results[index].incorrect_answers];
    const perguntasRand = shuffle(Alternativas);
    return (
      <div key={ dificulty }>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          {perguntasRand.map((x, Index) => {
            if (perguntas.results[index].correct_answer === x) {
              return (
                <button
                  className={ isColor ? 'activeC' : 'desactive' }
                  disabled={ isRespDisabled }
                  onClick={ this.keepResp }
                  type="button"
                  key={ Index }
                  data-testid="correct-answer"
                >
                  { x }
                </button>);
            }
            return (
              <button
                className={ isColor ? 'activeW' : 'desactive' }
                disabled={ isRespDisabled }
                onClick={ this.keepResp }
                type="button"
                key={ Index }
                data-testid={ `wrong-answer${perguntasRand
                  .length > 2 ? `-${Index}` : ''}` }
              >
                { x }
              </button>);
          })}
          <button
            style={ { display: isButtonDisabled ? 'none' : 'inline' } }
            disabled={ isButtonDisabled }
            onClick={ this.respondeu }
            type="button"
            data-testid="btn-next"
          >
            NEXT
          </button>
        </div>
        <Timer isColor={ isColor } />
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
        <div>{ loading ? null : this.renderPerguntas() }</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchApi()),
  updateIndex: () => dispatch(update()),
  updateIsRespDisabled: () => dispatch(updateButtons()),
  updateScore: (score) => dispatch(scoreUpdate(score)),
});

const mapStateToProps = (state) => ({
  index: state.player.index,
  isRespDisabled: state.player.isRespDisabled,
  timer: state.player.timer,
  name: state.player.name,
  score: state.player.score,
  url: state.player.url,
  settings: state.player.settings,
});

Trivia.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  settings: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    questions: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateIndex: PropTypes.func.isRequired,
  isRespDisabled: PropTypes.bool.isRequired,
  updateIsRespDisabled: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
