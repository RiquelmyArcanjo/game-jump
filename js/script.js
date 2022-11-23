const avatar = document.querySelector('.avatar');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

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

}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const avatarPosition = +window.getComputedStyle(avatar).bottom.replace('px', '');
    const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');
    console.log(avatarPosition);

    if ((pipePosition < 120 || pipePosition == 120) && pipePosition > 0  && avatarPosition < 100) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        avatar.style.animation = 'none';
        avatar.style.bottom = `${avatarPosition}px`;

        avatar.src = './images/game-over.png';
        avatar.style.width = '75px';
        avatar.style.marginLeft = '50px';

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudsPosition}px`;
        
        clearInterval(loop); // quando acaba o jogo o loop para de rodar
    }
    
}, 10);

document.addEventListener('mousedown', jump);
document.addEventListener('keydown', jump);
