const body = document.querySelector("body"),
    NumIMG = 9;

function PaintImg(ImgNum){
    const image = new Image();
    image.src = `../images/${ImgNum+1}.jpg`;
    body.appendChild(image);
    image.classList.add("BGImage");
}

function GenRandom(){
    return Math.floor(Math.random()*NumIMG);
}

function init(){ 
    const randomNumber = GenRandom();
    PaintImg(randomNumber);
}
init();