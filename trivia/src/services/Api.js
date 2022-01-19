const fetchToken = () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  return fetch(url).then((data) => data.json());
};

export default fetchToken;
