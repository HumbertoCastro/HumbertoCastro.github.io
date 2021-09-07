window.addEventListener('scroll',blurheader)

function blurheader() {
    let value = window.scrollY;
    let header = document.querySelector("main");
    console.log(value*0.001);
    header.style.opacity = "" +  (1-value*0.001);
}