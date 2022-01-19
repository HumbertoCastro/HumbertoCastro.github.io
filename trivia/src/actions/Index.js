import fetchToken from '../services/Api';

const getToken = (token) => ({
  type: 'GET_TOKEN',
  token,
});

export const SaveOptions = (data) => ({
  type: 'SAVE_SETTINGS',
  data,
});

const magicSaveData = 'SAVE_DATA';
export const SaveData = (dados) => ({
  type: magicSaveData,
  dados,
});

const failToGetToken = (error) => ({
  type: 'FAIL_TO_GET_TOKEN',
  token: error,
});

export const fetchApi = () => (dispatch) => fetchToken()
  .then((s) => {
    localStorage.setItem('token', s.token);
    dispatch(getToken(s));
  })
  .catch((error) => dispatch(failToGetToken(error)));

export const updateIndex = () => ({
  type: 'UPDATE_INDEX',
});

export const updateButtons = () => ({
  type: 'UPDATE_BUTTONS',
});

export const getTimer = (timer) => ({
  type: 'GET_TIMER',
  timer,
});

export const updateScore = (score) => ({
  type: 'UPDATE_SCORE',
  score,
});

export const getGravatarImage = (url) => ({
  type: 'GET_GRAVATAR_IMAGE',
  url,
});
