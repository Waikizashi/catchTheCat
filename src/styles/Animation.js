import shh from '../img/shh.png'
import meow from '../img/meow.png'
import getRandomInt from '../mechanic/getRandomInt';

export default function pop (e, type, tagetType, count) {
    let clientX = 0
    let clientY = 0
    if(e.type === 'toucheend'){
        const { clientX:x, clientY:y } = e.touches[0];
        clientX = x
        clientY = y
    }
    else if(e.type === 'click' || e.type === 'dragend'){
        clientX = e.clientX;
        clientY = e.clientY;
    }
    e.target.dataset.type = `${type}`
    //console.log('pop', e.target.dataset.type)
    let amount = count

    if (clientX === 0 && clientY === 0) {
        const bbox = e.target.getBoundingClientRect();
        const x = bbox.left + bbox.width / 2;
        const y = bbox.top + bbox.height / 2;
        for (let i = 0; i < 30; i++) {
            createParticle(x, y, e.target.dataset.type, type);
        }
        } else {
        for (let i = 0; i < amount; i++) {
            createParticle(clientX, clientY, e.target.dataset.type, tagetType);
        }
    }
}
function createParticle (x, y, type,targetType) {
    const particle = document.createElement('particle');
    particle.style = `
    will-change: transform;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    background-repeat: no-repeat;
    background-size: contain;`
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + window.innerWidth*0.02);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 120;
    let destinationY = (Math.random() - 0.5) * 120;
    let rotation = Math.random() * 520;
    let delay = 0
    switch (type) {
        case 'true':
            particle.style.backgroundImage = `url(${meow})`; 
            break;
        case 'false':
            particle.style.backgroundImage = `url(${shh})`; 
            break;
        case 'shadow':            
            const color = targetType ? `hsla(120, 53%, 52%,${getRandomInt(100, 1000)/1000})` : `hsla(0, 62%, 55%,${getRandomInt(100, 1000)/1000})` 
            particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
            particle.style.background = color;
            particle.style.borderRadius = '50%'; 
            width = height = Math.random() * 5 + 4; 
            break;
        default: break;

    }
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
        {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
            opacity: 0
        }
        ], {
        duration: Math.random() * 500 + 1000, // Продолжительность всех эффектов
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay
    });
    animation.onfinish = removeParticle;
}
function removeParticle (e) {
    e.srcElement.effect.target.remove();
}
