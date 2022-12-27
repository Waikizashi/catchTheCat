const hiScreen = document.querySelector('.hiScreen')
const welcome = document.querySelector('#welcome')
const pause = document.querySelector('#pause')
const reboot = document.querySelector('#reboot')
const start = document.querySelector('#start')
const settings = document.querySelector('#settings')
const lvls = document.querySelectorAll('#choseMode li p')

lvls.forEach(el =>{
    el.addEventListener('click', ()=>{
        lvls.forEach(el =>{
            el.classList.remove('chosen')
        })
        el.classList.add('chosen')
    })
})


start.addEventListener('click', ()=>{
    hiScreen.classList.add('close')
    settings.classList.add('close')
    welcome.classList.add('close')
    start.classList.add('close')
    hiScreen.style = `transform: translateY(${(window.innerHeight-340)/2}px)`
    pause.innerHTML = 'pause'
    reboot.innerHTML = 'reboot'
    //_init_()
})


pause.addEventListener('click', ()=>{
    hiScreen.classList.remove('close')
    settings.classList.remove('close')
    welcome.classList.remove('close')
    start.classList.remove('close')
    hiScreen.style = ``
    pause.innerHTML = '...'
})
