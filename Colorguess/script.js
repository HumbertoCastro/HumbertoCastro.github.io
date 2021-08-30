function generetedcolors(numerodecores){
    for(i=0;i < numerodecores; i++){
        let randomColor = "rgb("+(Math.round(Math.random()*260))+","+(Math.round(Math.random()*260))+","+(Math.round(Math.random()*260))+")";
        let ball = document.createElement("li");
        ball.className = "ball hover";
        ball.style.backgroundColor = randomColor;
        ball.addEventListener("click",guess);
        document.querySelector(".lista").appendChild(ball);
    }
    rgbtext();
}
function rgbtext(){
    let random = Math.round(Math.random()*5);
    console.log(random);
    let valor =document.querySelectorAll(".ball")[random].style.backgroundColor;
    let Rgb = [];
    for(i=3;i<valor.length;i++){
        Rgb.push(valor[i]);
    }
    console.log("rgb - " + Rgb);
    valor = "";
    for(i=0;i<Rgb.length;i++){
        valor += Rgb[i];
    }
    console.log("Valor " + valor);
    document.querySelector("p").innerText = valor;
}
function guess(origin){
    console.log(origin.target);
    if(origin.target.style.backgroundColor == "rgb"+document.querySelector("p").innerText){
        document.querySelector("#answer").innerText = "Acertou!";     
        Reset(); 
        addPoint();   
    }
    else{
        document.querySelector("#answer").innerText = "Errou!Tente novamente!";      
        Reset();   
    }
}
function addPoint(){
    document.querySelector("#score").innerText = parseInt(document.querySelector("#score").innerText) + 3;
}
function Reset(){
    let lista = document.querySelectorAll(".ball");
    for(i=0;i<lista.length;i++){
        lista[i].parentElement.removeChild(lista[i]);
    } 
    generetedcolors(6);
}
generetedcolors(6);