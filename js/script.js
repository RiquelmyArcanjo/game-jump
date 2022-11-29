const avatar = document.querySelector('.avatar');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameover = './images/game-over.gif';
let segundos = 0;
let minutos = 0;

function numeroInteiroRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function segundo(){
    //incrementa os segundos
    segundos++;
    if(segundos==60){
        //incrementa os minutos
        minutos++;
        //Zerar os segundos
        segundos=0;
        //escreve os minutos
        document.getElementById('minuto').innerHTML=minutos
    }
    //escreve os segundos
    document.getElementById('segundo').innerHTML=segundos
    
}

const cronometro = setInterval(function(){ segundo() },1000)


const jump = () => {
    avatar.classList.add('jump');

    if (window.matchMedia("(max-width:600px)").matches) {
        setTimeout(() =>{
            avatar.classList.remove('jump');
        }, 1200)
    }
    else{
        setTimeout(() =>{
            avatar.classList.remove('jump');
        }, 500)
    }
    
    document.getElementById('musica-fundo').src = 'audios/jump/'+ numeroInteiroRandom(0, 15) + '.mp3';
    document.getElementById('musica-fundo').play();
}

//Jogador perde
const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const avatarPosition = +window.getComputedStyle(avatar).bottom.replace('px', '');
    const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');

    if ((pipePosition < 120 || pipePosition == 120) && pipePosition > 0  && avatarPosition < 100) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        avatar.style.animation = 'none';
        //avatar.style.bottom = `${avatarPosition}px`;

        avatar.src = gameover;
        avatar.style.width = '350px';
        avatar.style.marginLeft = '700px';

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudsPosition}px`;
        
        //quando acaba o jogo o loop para de rodar
        clearInterval(loop); 
        clearInterval(cronometro);

        document.getElementById('musica-fundo').volume = 0.0;
        document.getElementById('audio-game-over').src = 'audios/game-over/'+ numeroInteiroRandom(0, 5) + '.mp3';
        document.getElementById('audio-game-over').play();
    }
    
}, 10);

document.addEventListener('mousedown', jump);
document.addEventListener('keydown', jump);


