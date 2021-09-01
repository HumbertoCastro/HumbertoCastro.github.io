function Texto() {
    console.log('entrou');
    document.querySelector('#meme-text').innerText = document.querySelector('#text-input').value;
}

function AddEventList() {
    document.querySelector('#text-input').addEventListener('input', Texto);
    document.querySelector('#meme-insert').addEventListener('change', Definirimage);
    const butons = document.querySelectorAll(".images");
    for (let i = 0; i < butons.length; i += 1) {
        butons[i].addEventListener('click', ApplyImage);
    }
}
function Definirimage(event) {
    console.log('entrou');
    document.querySelector("#meme-image-container").removeChild(document.querySelector("#meme-image"));
    let image = document.createElement('img');
    image.id = "meme-image";
    // codigo retirado da pagina https://www.webtrickshome.com/forum/how-to-display-uploaded-image-in-html-using-javascript
    image.src = URL.createObjectURL(event.target.files[0]);
    document.querySelector("#meme-image-container").appendChild(image);
}
function ChangeBordaEarth() {
    document.getElementById('meme-image-container').style.border = '6px groove green';
}
function ChangeBordaFire() {
    document.getElementById('meme-image-container').style.border = '3px dashed red';
}
function ChangeBordaWater() {
    document.getElementById('meme-image-container').style.border = '5px double blue';
}
function ApplyImage(origin) {
    document.querySelector("#meme-image-container").removeChild(document.querySelector("#meme-image"));
    let image = document.createElement('img');
    image.id = "meme-image";
	image.src = origin.target.src;
    document.querySelector("#meme-image-container").appendChild(image);
}
AddEventList();