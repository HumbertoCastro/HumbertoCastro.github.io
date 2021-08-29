function StartFuncionts(){
        document.querySelector(".colorpickerbackground").addEventListener("input",BackgroundColor);
        document.querySelector(".colorpickertext").addEventListener("input",TextColor);
        document.querySelector(".TextSize").addEventListener("input",TextSize);
        document.querySelector(".linespacing").addEventListener("input",linespacing);
        document.querySelector(".FontName").addEventListener("change",fontname);
}
function fontname(origin){
    document.querySelector(".texto").style.fontFamily = origin.target.value;    
    localStorage.setItem("fontname",origin.target.value);
}
function linespacing(origin){
    document.querySelector(".texto").style.lineHeight = origin.target.value + "px";   
    localStorage.setItem("linespacing",origin.target.value +"px"); 
}
function BackgroundColor(origin){
    document.querySelector("body").style.backgroundColor = origin.target.value;
    localStorage.setItem("BackgroundColor",origin.target.value);
    console.log("lo");
}
function TextColor(origin){
    document.querySelector(".texto").style.color = origin.target.value;
    localStorage.setItem("TextColor",origin.target.value);
    console.log("lo");
}
function TextSize(origin){
    document.querySelector(".texto").style.fontSize = origin.target.value + "px";    
    localStorage.setItem("TextSize", origin.target.value + "px");
}

function StartPage(){
    document.querySelector(".texto").style.fontFamily = localStorage.getItem("fontname");
    document.querySelector(".texto").style.color = localStorage.getItem("TextColor");
    document.querySelector(".texto").style.fontSize = localStorage.getItem("TextSize");    
    document.querySelector("body").style.backgroundColor = localStorage.getItem("BackgroundColor");
    document.querySelector(".texto").style.lineHeight = localStorage.getItem("linespacing");  
    
    StartFuncionts();
}

window.addEventListener("load", StartPage);
