window.addEventListener('scroll',blurheader)

function blurheader() {
    let value = window.scrollY;
    let back = document.querySelector(".backtotop");
    let header = document.querySelector("main");
    header.style.opacity = "" +  (1-value*0.001);
    back.style.opacity = "" +  (0+value*0.01);
}