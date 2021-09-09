function Login(event) {
  event.preventDefault();
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  if (email === 'tryber@teste.com' && password === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
let valor = 500;
function counter() {
  valor = 500 - document.querySelector('#textarea').value.length;
  if (valor >= 0) {
    document.querySelector('#counter').innerText = valor;
  }
}
function habilitarbtn() {
  document.querySelector('#submit-btn').disabled = false;
}
function inicar() {
  document.querySelector('#textarea').addEventListener('input', counter);
  document.querySelector('.button').addEventListener('click', Login);
  document.querySelector('#submit-btn').addEventListener('click', habilitarbtn);
}
inicar();
