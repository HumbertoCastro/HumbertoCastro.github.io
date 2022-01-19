import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateIndex as update,
  updateButtons as buttonsUpdate,
  getTimer as timerUpdate,
} from '../actions/Index';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      stateIndex: 0,
    };
    this.renderFunction = this.renderFunction.bind(this);
  }

  componentDidMount() {
    const INTERVAL = 1000;
    const { timer } = this.state;
    setInterval(() => {
      if (timer !== 0) {
        this.setState((prev) => this.setState({ timer: prev.timer - 1 }));
      }
    }, INTERVAL);
  }

  componentDidUpdate() {
    const { timer, stateIndex } = this.state;
    const { index, getTimer, isColor } = this.props;

    if (isColor) {
      getTimer(timer);
    }

    if (stateIndex !== index) { // trigger caso haja alguma alteração no index
      this.setNewState();
    }
    if (timer === 0) {
      this.updateTimer();
    }
  }

  setNewState() { // caso a pessoa responda.
    const { index } = this.props;
    this.setState({ stateIndex: index, timer: 30 });
    const { stateIndex } = this.state;
    return stateIndex;
  }

  updateTimer() { // caso o tempo esgote.
    const { updateIndex, updateRespDisabled } = this.props;
    updateRespDisabled();
    this.setState({ timer: 30 }, () => {
      const INTERVAL = 5000;
      setTimeout(() => {
        this.setState({ timer: 30 });
        updateRespDisabled();
        updateIndex();
      }, INTERVAL);
    });
  }

  renderFunction() {
    const { index } = this.props;
    const { timer } = this.state;
    return (
      <>
        <p>
          { timer }
          {' '}
          segundos restantes
        </p>
        <p>
          { index + 1 }
          ª pergunta
        </p>
      </>
    );
  }

  render() {
    const { isRespDisabled } = this.props;
    return (
      <div className="timer-container">
        { isRespDisabled ? null : this.renderFunction() }
      </div>
    );
  }
}

Timer.propTypes = {
  index: PropTypes.number.isRequired,
  updateIndex: PropTypes.func.isRequired,
  isRespDisabled: PropTypes.bool.isRequired,
  updateRespDisabled: PropTypes.func.isRequired,
  getTimer: PropTypes.func.isRequired,
  isColor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  index: state.player.index,
  isRespDisabled: state.player.isRespDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  updateIndex: () => dispatch(update()),
  updateRespDisabled: () => dispatch(buttonsUpdate()),
  getTimer: (timer) => dispatch(timerUpdate(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
