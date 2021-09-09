function createtrinagulo () {
  resetar();
  let linhas = document.querySelector("input").value;
  if(linhas <= 34) {
    for (let i = 0; i < linhas-1; i += 1) {
      let linha = document.createElement("div");
      linha.className = "line";
  
      //calcular numero de cubos por linha do triangulo
      for (let z = 0; z < i + 1 + 1 * i; z += 1) {
        let box = document.createElement('div');
        box.className = 'box';    
        linha.appendChild(box);
        console.log('entrou');
      }
      document.querySelector('.triangle').appendChild(linha);
    }
  } else {
    alert('linhas demais');
  }
}

function resetar() {
  let boxes = document.querySelectorAll(".line");
  for(let i = 0; i < boxes.length; i += 1) {
    //boxes[i].parentElement.removeChild[boxes[i]];
    document.querySelector(".line").parentElement.removeChild(document.querySelector(".line"));
    
  }
}