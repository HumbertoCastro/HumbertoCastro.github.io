const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  timer: 30,
  score: 0,
  url: '',
  index: 0,
  isRespDisabled: false,
  questionsCorrect: 0,
  settings: {},
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EMAIL':
    return { ...state };
  case 'SAVE_DATA':
    // console.log(action.dados);
    return { ...state, name: action.dados.name, gravatarEmail: action.dados.email };
  case 'UPDATE_INDEX': {
    const { index } = state;
    const newIndex = index + 1;
    return { ...state, index: newIndex };
  }
  case 'UPDATE_BUTTONS': {
    const { isRespDisabled: boolean } = state;
    const isRespDisabled = !boolean;
    return { ...state, isRespDisabled };
  }
  case 'GET_TIMER': {
    const { timer } = action;
    return { ...state, timer };
  }
  case 'SAVE_SETTINGS': {
    const { data } = action;
    return { ...state, settings: data };
  }
  case 'UPDATE_SCORE': {
    const { score: actionScore } = action;
    const { score: stateScore, assertions: stateAssertions, questionsCorrect } = state;
    const score = actionScore + stateScore;
    const assertions = stateAssertions + 1;
    const newQuestions = questionsCorrect + 1;
    return { ...state, score, assertions, questionsCorrect: newQuestions };
  }
  case 'GET_GRAVATAR_IMAGE': {
    const { url } = action;
    return { ...state, url };
  }
  default:
    return { ...state };
  }
};

export default player;
