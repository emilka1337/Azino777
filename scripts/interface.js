'use strict'

class Interface {
    static darkMode() {
        let button = document.getElementById('colorScheme')
        button.innerText = 'Dark';
        button.className = 'btn btn-dark';

        let p = document.getElementsByTagName('p');
        let h1 = document.getElementsByTagName('h1');
        let h2 = document.getElementsByTagName('h2');
        let h3 = document.getElementsByTagName('h3');
        let h4 = document.getElementsByTagName('h4');
        let h5 = document.getElementsByTagName('h5');
        let label = document.getElementsByTagName('label');

        for (let i of h1) {
            i.style.color = 'white';
        }
        for (let i of h2) {
            i.style.color = 'white';
        }
        for (let i of h3) {
            i.style.color = 'white';
        }
        for (let i of h4) {
            i.style.color = 'white';
        }
        for (let i of h5) {
            i.style.color = 'white';
        }
        for (let i of label) {
            i.style.color = 'white';
        }

        document.getElementById('site').className = 'bg-dark'
    }

    static lightMode() {
        let button = document.getElementById('colorScheme')
        button.innerText = 'Light';
        button.className = 'btn btn-outline-dark';

        let p = document.getElementsByTagName('p');
        let h1 = document.getElementsByTagName('h1');
        let h2 = document.getElementsByTagName('h2');
        let h3 = document.getElementsByTagName('h3');
        let h4 = document.getElementsByTagName('h4');
        let h5 = document.getElementsByTagName('h5');
        let label = document.getElementsByTagName('label');

        for (let i of h1) {
            i.style.color = 'black';
        }
        for (let i of h2) {
            i.style.color = 'black';
        }
        for (let i of h3) {
            i.style.color = 'black';
        }
        for (let i of h4) {
            i.style.color = 'black';
        }
        for (let i of h5) {
            i.style.color = 'black';
        }
        for (let i of label) {
            i.style.color = 'black';
        }

        document.getElementById('site').className = 'bg-light'
    }

    static toggleColorMode() {
        if (localStorage.getItem('colorMode') == 'light' || localStorage.getItem('colorMode') == undefined) {
            this.darkMode();
            localStorage.setItem('colorMode', 'dark');
        } else {
            this.lightMode();
            localStorage.setItem('colorMode', 'light');
        }
    }

    static makeSlotImages = (result) => {     // Анимация слот-картинок
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`slots-${i}`).setAttribute('src', '')
        }

        for (let i = 1; i <= 3; i++) {
            setTimeout(() => {
                document.getElementById(`slots-${i}`).setAttribute('src', `img/${result[i - 1]}.png`)
            }, i * 1000)
        }
    }
}

class Roulette extends Interface {
    constructor() { }

    static rotateRoulette(indexOfNumberFromArray) {     // Запустить рулетку
        let random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

        let degree = -1 * indexOfNumberFromArray * 360 / 38 + 360 * random(5, 15);
        let roulette = document.getElementById('roulette');

        if (roulette.animationName == 'roulette') {
            style.animationName = 'abc';
        }

        setTimeout(
            () => document.getElementById('roulette').style.transform = `rotate(${degree}deg)`,
            1
        )
    }

    static resetRoulette() {              // Сброс положения рулетки
        let roulette = document.getElementById('roulette');
        roulette.style.transition = '1s';
        setTimeout(() => {
            if (roulette.animationName == 'abc') {
                roulette.style.animationName = 'roulette';
            }
        },
            5000
        )
        roulette.style.transform = 'rotate(0deg)';
        roulette.style.transition = '5s';
    }

    static rouletteChoiseMade() {         // При сделанном выборе игры показывает опции самой игры
        let previousChoices = document.getElementsByClassName('col rouletteInGameChoice');

        for (let choice of previousChoices) {
            choice.className = 'col d-none rouletteInGameChoice';
        }

        let games = document.getElementsByClassName('rouletteGame');
        let gameMode = 1;

        for (let game of games) {
            if (game.checked) {
                document.getElementById(`game-${gameMode}`).className = 'col rouletteInGameChoice';
            } else {
                gameMode++;
            }
        }
    }
}