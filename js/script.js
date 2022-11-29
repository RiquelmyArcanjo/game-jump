const avatar = document.querySelector('.avatar');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const rip = './images/rip.png';
const gameover = './images/game-over.gif';
let segundos = 0;
let minutos = 0;

//Gerador numero inteiro random
function numeroInteiroRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//Tempo jogo
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

//Pulo avatar
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
    //Inicia musica fundo
    document.getElementById('musica-fundo').play();

    //Audios de pulo
    document.getElementById('audio-pulo').src = 'audios/jump/'+ numeroInteiroRandom(0, 15) + '.mp3';
    document.getElementById('audio-pulo').play();
    

}
//Setando volume da musica de fundo
document.getElementById('musica-fundo').volume = 0.3;

//Jogador perde
const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const avatarPosition = +window.getComputedStyle(avatar).bottom.replace('px', '');
    const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');

    if ((pipePosition < 120 || pipePosition == 120) && pipePosition > 0  && avatarPosition < 100) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        avatar.style.animation = 'none';

        avatar.src = rip;
        avatar.style.width = '135px';
        avatar.style.marginLeft = '25px';
        pipe.src = '';
        document.getElementById('game-over').src = gameover;
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over').style.marginLeft = 'auto';
        document.getElementById('game-over').style.marginRight = 'auto';
        document.getElementById('game-over').style.position = 'relative';
        
        if (window.matchMedia("(max-width:600px)").matches) {
            document.getElementById('game-over').style.width = '250px';
        }

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudsPosition}px`;
        
        //quando acaba o jogo o loop para de rodar
        clearInterval(loop); 
        clearInterval(cronometro);

        document.getElementById('musica-fundo').volume = 0.0;
        document.getElementById('audio-pulo').volume = 0.0;
        document.getElementById('audio-game-over').src = 'audios/game-over/'+ numeroInteiroRandom(0, 5) + '.mp3';
        document.getElementById('audio-game-over').play();
    }
    
}, 10);

//Clique e teclado -> jump()
document.addEventListener('mousedown', jump);
document.addEventListener('keydown', jump);


