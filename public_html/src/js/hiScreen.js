const hiScreen = document.querySelector('.hiScreen')
const pause = document.querySelector('#pause')
const reboot = document.querySelector('#reboot')
const start = document.querySelector('#start')
const hiScrEls = document.querySelectorAll('.hiScreen p')




start.addEventListener('click', ()=>{
    hiScreen.classList.add('closeHiScreen')
    hiScrEls.array.forEach(el => {
        el.style = 'color: balck'
    });
    //hiScreen.style = `transform: translateY(${(window.innerHeight-340)/2}px)`
    pause.innerHTML = 'pause'
    reboot.innerHTML = 'reboot'
    //_init_()
})


pause.addEventListener('click', ()=>{
    hiScreen.classList.remove('closeHiScreen')
    hiScreen.style = ``
    pause.innerHTML = '...'
})
