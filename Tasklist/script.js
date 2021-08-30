function addTask(){
    let tarefatexto = document.querySelector("#texto-tarefa").value;
    document.querySelector("#texto-tarefa").value = "";
    let tarefa = document.createElement("li");
    tarefa.addEventListener("click",ClickTarefa);
    tarefa.addEventListener("dblclick",CompletTask);
    tarefa.innerText = tarefatexto;
    tarefa.className = "Tarefa";
    document.querySelector("#lista-tarefas").appendChild(tarefa);
}
function changeSelected(){

}
function removerselected(){
    document.querySelector("#selected").parentElement.removeChild(document.querySelector("#selected"));
}
function CompletTask(origin){
    if(origin.target.className.includes("completed")){
        origin.target.className = "Tarefa";
    }else{
    origin.target.className += " completed";
    }
}
function eraselist(){
    let lista = document.querySelectorAll(".Tarefa");
    for(i=0;i<lista.length;i++){
        console.log("lo");
        lista[i].parentElement.removeChild(lista[i]);
    }
    localStorage.setItem("ListaVazia",true);
}
function removerfinalizados(){
    let lista = document.querySelectorAll(".completed");
    for(i=0;i<lista.length;i++){
        lista[i].parentElement.removeChild(lista[i]);
    }
}

function savelist(){ 
    if(document.querySelectorAll(".Tarefa").length != 0  ){
        let lista=[];
        let values = document.querySelectorAll("li");
        for(i=0;i<document.querySelectorAll("li").length;i++){
            lista.push(values[i].outerHTML);
        }
        localStorage.setItem("Tarefas",JSON.stringify(lista));
        console.log(localStorage.getItem("Tarefas")[0]);
        localStorage.setItem("ListaVazia",false);
    }
}
function ClickTarefa(origin){
    let tarefas = document.querySelectorAll(".Tarefa");
    for(i=0;i < tarefas.length;i++){
        tarefas[i].style.backgroundColor = "white";
        tarefas[i].id = "";
    }
    origin.target.id = "selected"
    origin.target.style.backgroundColor = "rgb(128, 128, 128)";
}

function loadList(){
    console.log(localStorage.getItem("ListaVazia"));     
        console.log("od");
        tarefas = JSON.parse(localStorage.getItem("Tarefas"));
    for(i=0;i < tarefas.length;i++){
        let li = document.createElement("li");
        document.querySelector("#lista-tarefas").appendChild(li);
        li.outerHTML = tarefas[i];
    }              
    addEventos();     
}
function addEventos(){
    let tarefas = document.querySelectorAll(".Tarefa")
    for(i=0;i<tarefas.length;i++){
        console.log("entrou");
        tarefas[i].addEventListener("click",ClickTarefa);
        tarefas[i].addEventListener("dblclick",CompletTask);
    }

}
if(localStorage.getItem("ListaVazia") !== "true"){
    loadList();
}
function MoveUp(){
    let selecionado = document.querySelector("#selected").outerHTML;
    if(selecionado !==  document.querySelector("li").outerHTML){
        let cima = document.querySelector("#selected").previousSibling.outerHTML;
        document.querySelector("#selected").previousSibling.outerHTML = selecionado;
        document.querySelector("#selected").nextSibling.outerHTML = cima;
    }
    addEventos();  
}
function MoveDown(){
    let selecionado = document.querySelector("#selected").outerHTML;
    let lista = document.querySelectorAll("li");
    if(selecionado !==  document.querySelectorAll("li")[lista.length-1].outerHTML){
        let baixo = document.querySelector("#selected").nextSibling.outerHTML;
        document.querySelector("#selected").nextSibling.outerHTML = selecionado;
        document.querySelector("#selected").outerHTML = baixo;
    }
    addEventos();  
}