function addColorToPalete(){
    let lista = document.querySelectorAll(".color");
    let listadecor = ["black",'',"","",""];
    for(i=0;i < listadecor.length-1; i++){
        //Codigo retirado da font - https://css-tricks.com/snippets/javascript/random-hex-color/
        let  randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        listadecor[i+1] = randomColor;
    }

    for(i=0;i<lista.length;i++){
        lista[i].addEventListener("click",SelectColor);
        lista[i].style.backgroundColor = listadecor[i];
        lista[i].style.width = "100px";
        lista[i].style.height = "100px";
    }
}
function addFunctionToPixels(){
    let lista = document.querySelectorAll(".pixelCube");
    for(i=0;i<lista.length;i++){
        lista[i].addEventListener("click",selectToPaint);
    }
}
function selectToPaint(origin){
    console.log(origin.target);
    origin.target.style.backgroundColor = document.querySelector(".selected").style.backgroundColor;
}
function resetboard(){
    let lista = document.querySelectorAll(".pixelCube");
    for(i=0;i<lista.length;i++){
        lista[i].parentElement.removeChild(lista[i]);
    }    
}
function tamanho(){
    resetboard();
    let valor = document.querySelector(".tamanho").value;
    if(valor >= 50){
        valor = 50;
    }else if(valor <= 5){
        valor = 5;
    }
    for(i=0;i<valor;i++){
        let linha = document.createElement("div");
        for(z=0;z<valor;z++){
            console.log("");
            let pixel = document.createElement("li");
            pixel.className = "pixelCube";            
            linha.appendChild(pixel);
        }    
        document.querySelector("#pixel-board").appendChild(linha);
    }
    addFunctionToPixels();
}
function CleanBoard(){
    let lista = document.querySelectorAll(".pixelCube");
    for(i=0;i<lista.length;i++){
        lista[i].style.backgroundColor = "white";
    }    
}
function SelectColor(origin){
    console.log(origin.target);
    let lista = document.querySelectorAll(".color");
    for(i=0;i<lista.length;i++){
        lista[i].className = "color";
    }
    origin.target.className += " selected";
}
addColorToPalete();