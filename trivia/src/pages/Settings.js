import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SaveOptions } from '../actions/Index';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      difficulty: '',
      category: '',
      questions: '',
    };
    this.HandleInput = this.HandleInput.bind(this);
    this.beginGame = this.beginGame.bind(this);
  }

  beginGame() {
    const { storegeData, history } = this.props;
    storegeData(this.state);
    history.push('/trivia');
  }

  HandleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    const buttoes = document.querySelectorAll(`.${name}-button`);
    for (let i = 0; i < buttoes.length; i += 1) {
      buttoes[i].style.opacity = '50%';
    }
    target.style.opacity = '100%';
  }

  render() {
    return (
      <div className="login-container">
        <form>
          <div className="category-div">
            <h1>Category</h1>
            <button
              className="category-button"
              type="button"
              name="category"
              value="22"
              onClick={ this.HandleInput }
            >
              geografy
            </button>
            <button
              className="category-button"
              type="button"
              name="category"
              value="21"
              onClick={ this.HandleInput }
            >
              Sports
            </button>
            <button
              className="category-button"
              type="button"
              name="category"
              value="11"
              onClick={ this.HandleInput }
            >
              Movies
            </button>
            <button
              className="category-button"
              type="button"
              name="category"
              value="10"
              onClick={ this.HandleInput }
            >
              Books
            </button>
          </div>
          <div className="difficulty-div">
            <h1>DIFFICULTY</h1>
            <button
              className="difficulty-button"
              type="button"
              name="difficulty"
              value="easy"
              onClick={ this.HandleInput }
            >
              EASY
            </button>
            <button
              className="difficulty-button"
              type="button"
              name="difficulty"
              value="medium"
              onClick={ this.HandleInput }
            >
              MEDIUM
            </button>
            <button
              className="difficulty-button"
              type="button"
              name="difficulty"
              value="hard"
              onClick={ this.HandleInput }
            >
              HARD
            </button>
          </div>
          <div className="number-questions">
            <h1>Number of Questions</h1>
            <button
              className="questions-button"
              type="button"
              name="questions"
              value="5"
              onClick={ this.HandleInput }
            >
              5
            </button>
            <button
              className="questions-button"
              type="button"
              name="questions"
              value="10"
              onClick={ this.HandleInput }
            >
              10
            </button>
            <button
              className="questions-button"
              type="button"
              name="questions"
              value="20"
              onClick={ this.HandleInput }
            >
              20
            </button>
          </div>
          <button type="button" onClick={ this.beginGame }>
            BEGIN
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  storegeData: (data) => dispatch(SaveOptions(data)),
});

export default connect(null, mapDispatchToProps)(Settings);

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  storegeData: PropTypes.func.isRequired,
};
