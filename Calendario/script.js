
function createDaysOfTheWeek() {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const weekDaysList = document.querySelector('.week-days');

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement('li');
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  };
};
const dezDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

function CreateDias(){
  let lista = document.querySelector(".days-container ul");
  for(i=0;i<dezDaysList.length;i++){
    let dia = document.createElement("li");
    dia.innerText = dezDaysList[i];
    if(dezDaysList[i] == 24  || dezDaysList[i] == 25 ||dezDaysList[i] == 31){
      dia.className = "day holiday";
    }else if (dezDaysList[i] == 4  || dezDaysList[i] == 11 ||dezDaysList[i] == 18||dezDaysList[i] == 25){
      dia.className = "day friday";
    }else {
      dia.className = "day";
    }
    dia.addEventListener("mouseover",mouseover);
    dia.addEventListener("mouseleave",mouseleave);
    dia.addEventListener("click", putcolor);
    lista.appendChild(dia);
  }
}
function putcolor(element){
  let origin = element.target;
  console.log(origin);
  if(document.querySelector(".my-tasks div").className == "task select"){
    if(element.target.style.backgroundColor !== document.querySelector(".my-tasks div").style.backgroundColor){   
      origin.style.backgroundColor = document.querySelector(".task").style.backgroundColor;  
    }else{
      element.target.style.backgroundColor = "#eee";      
    }
  }
}
function addButaoCompromisso(){
  document.querySelector("#btn-add").addEventListener("click",addtasks);
}
addButaoCompromisso();
function addtasks(){
  let x = document.getElementById("task-input").value;
  console.log(x);
  let compromissos = document.createElement("div");
  let texto = document.createElement("h1");
  texto.innerText = x;
  compromissos.appendChild(texto);
  document.querySelector("body").appendChild(compromissos);
}
function AdicionarFeriados(){
  let butao = document.querySelector("#btn-holiday");
  butao.addEventListener("click",changecolor);
}

function adicionarsexta(){
  let butao = document.createElement("button");
  butao.id = "btn-friday";
  butao.innerText = "Sextou";
  butao.addEventListener("click", Changesextaname);
  document.querySelector(".buttons-container").appendChild(butao);
}
function Changesextaname(){
  let lista = document.querySelectorAll(".friday");
  for(i=0;i<lista.length;i++){
    lista[i].innerText = "SEXTOU";
  }
}
function tarefa(frase){
  let fraseparaadicionar = document.createElement("span");
  fraseparaadicionar.innerText = frase;
  document.querySelector(".my-tasks").appendChild(fraseparaadicionar);
}

function taskColor(cor){
  let color = document.createElement("div");
  color.className = "task";
  color.style.backgroundColor = cor;
  color.addEventListener("click",taskselect);
  document.querySelector(".my-tasks").appendChild(color);
}

function taskselect(){
  if(document.querySelector(".my-tasks div").className == "task"){
    document.querySelector(".my-tasks div").className = "task select";
  }else{
    document.querySelector(".my-tasks div").className = "task";
  }  
}

tarefa("dsda");
taskColor("red");



function mouseover(origem){
  origem.target.style.fontsize = "50px";
  origem.target.style.fontSize = "40px";
}
function mouseleave(origem){
  origem.target.style.fontSize = "20px";
}
adicionarsexta();

function holidays(texto){
  let butao = document.createElement("button");
  butao.id = "btn-holiday";
  butao.innerText = texto;
  
  document.querySelector(".buttons-container").appendChild(butao);
}
function changecolor(){
  let varia = document.querySelectorAll(".holiday");
  for(i=0;i < varia.length;i++){
  if(varia[i].style.backgroundColor == "red"){
    varia[i].style.backgroundColor = "white";
  }  
  else{
  varia[i].style.backgroundColor = "red";
  }
}
}
holidays("Feriados");
CreateDias();
createDaysOfTheWeek();
AdicionarFeriados();
// Escreva seu código abaixo.
