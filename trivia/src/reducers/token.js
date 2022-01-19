const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_TOKEN': {
    // console.log(action.token);
    return action.token.token;
  }
  case 'FAIL_TO_GET_TOKEN': return state;
  default: return state;
  }
};

export default token;
