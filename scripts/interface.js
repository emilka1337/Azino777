'use strict'

class Interface {
    static darkMode() {
        let colorSchemeButton = document.getElementById('colorScheme')
        colorSchemeButton.innerText = 'Dark';

        document.getElementById('settings').className = 'btn btn-outline-warning';

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
        for (let i of p) {
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

        document.getElementById('settings').className = 'btn btn-outline-dark';

        let p = document.getElementsByTagName('p');
        let settingsLabel = document.getElementsByClassName('settings-label');
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
        for (let i of p) {
            i.style.color = 'black';
        }
        for (let i of label) {
            i.style.color = 'black';
        }
        for (let i of settingsLabel) {
            i.style.color = 'white';
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

    // static enableAnimations() {
    //     document.getElementById('animationsToggler').innerText = 'ON';
    //     // let animationNames = ['roulette', 'slots-1', 'slots-2', 'slots-3'];
    //     let animationNames = ['slots-1', 'slots-2', 'slots-3'];

    //     for (let name of animationNames) {
    //         document.getElementById(name).style.animationName = name;
    //     }

    //     // for (let i = 0; i < 100000; i++) {
    //     //     setTimeout(function() {
    //     //         document.getElementById('roulette').style.transform = `rotate(${i}deg)`;
    //     //     }, i * 100)
    //     // }

    //     let start = Date.now();
    //     let rouletteAmimation = setInterval(function () {
    //         let timePassed = Date.now() - start;

    //         document.getElementById('roulette').style.transform = `rotate(${timePassed / 5}deg)`;

    //         if (timePassed > 3600000) {
    //             clearInterval(rouletteAmimation);
    //         }
    //     }, 100)
    // }

    // static disableAnimations() {
    //     document.getElementById('animationsToggler').innerText = 'OFF';
    //     let animationNames = ['roulette', 'slots-1', 'slots-2', 'slots-3'];

    //     for (let name of animationNames) {
    //         document.getElementById(name).style.animationName = 'abc';
    //     }
    // }

    static toggleAnimations() {
        if (localStorage.getItem('animations') == 1) {
            this.disableAnimations();
            localStorage.setItem('animations', 0);
        } else {
            this.enableAnimations();
            localStorage.setItem('animations', 1);
        }
    }
}

class Slots {
    static makeSlotImages = (result, variants) => {     // Анимация слот-картинок
        let counter = 0;

        let img1 = setInterval(() => {
            if (counter == variants.length) {
                counter = 0;
            }
            document.getElementById(`slots-1`).setAttribute('src', `img/${variants[counter]}.png`);
        }, 50);
        let img2 = setInterval(() => {
            if (counter == variants.length) {
                counter = 0;
            }
            document.getElementById(`slots-2`).setAttribute('src', `img/${variants[counter]}.png`);
        }, 50);
        let img3 = setInterval(() => {
            if (counter == variants.length) {
                counter = 0;
            }
            document.getElementById(`slots-3`).setAttribute('src', `img/${variants[counter]}.png`);
            counter++;
        }, 50);

        setTimeout(() => {
            clearInterval(img1);
        }, 1900)
        setTimeout(() => {
            clearInterval(img2);
        }, 3900)
        setTimeout(() => {
            clearInterval(img3);
        }, 5900)

        for (let i = 1; i <= 3; i++) {
            setTimeout(() => {
                document.getElementById(`slots-${i}`).setAttribute('src', `img/${result[i - 1]}.png`);
            }, i * 2000);
        }
    }
}

class Roulette {
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

class Joker {
    static clearCardsList(who) {
        if (who == 'opponent') {
            document.getElementById('opponentCards').innerHTML = '';
        } else if (who == 'player') {
            document.getElementById('playerCards').innerHTML = '';
        }
    }

    static fillOpponentCards(opponent) {
        let opponentCardsCount = document.getElementsByClassName('opponentCard').length;
        let opponentCards = document.getElementById('opponentCards');
        let cardIndex = 0;

        while (opponentCardsCount < opponent.length) {
            let button = document.createElement('button');
            let img = document.createElement('img');
            img.src = 'img/Cards/Рубашка.png';
            img.style.width = '158px';
            img.style.height = '225px';
            button.style.border = 'none';
            button.style.padding = '0';
            button.style.width = '158px';
            button.style.height = '225px';
            button.style.transition = '200ms';
            button.style.outline = 'none';
            button.style.color = 'red';
            button.className = 'opponent-card';
            button.setAttribute('value', cardIndex);
            button.appendChild(img);

            button.onmouseover = () => button.style.marginTop = '20px';
            button.onmouseout = () => button.style.marginTop = '0px';

            opponentCards.appendChild(button);
            opponentCardsCount++;
            cardIndex++;
        }
    }

    static fillPlayerCards(player) {
        let playerCardsCount = document.getElementsByClassName('playerCards').length;
        let playerCards = document.getElementById('playerCards');
        let cardIndex = 0;

        while (playerCardsCount < player.length) {
            let button = document.createElement('button');
            let img = document.createElement('img');
            let cardName;
            if (player[cardIndex]['suit'] != 'JOKER') {
                cardName = `${player[cardIndex]['suit'].substring(0, player[cardIndex]['suit'].length - 2)}-${player[cardIndex]['value']}`;
            } else {
                cardName = 'JOKER';
            }

            // console.log(cardName);
            img.src = `img/Cards/${cardName}.png`;
            img.style.width = '158px';
            img.style.height = '225px';
            button.style.border = 'none';
            button.style.padding = '0';
            button.style.width = '158px';
            button.style.height = '225px';
            button.style.transition = '200ms';
            button.style.outline = 'none';
            button.className = 'player-card';
            button.setAttribute('value', cardIndex);
            button.appendChild(img);

            button.onmouseover = () => button.style.marginBottom = '10px';
            button.onmouseout = () => button.style.marginBottom = '0px';

            playerCards.appendChild(button);
            playerCardsCount++;
            cardIndex++;
        }
    }

    static animateSelectedOpponentCard(opponentCards, index) {
        let cardsHTML = document.getElementById('opponentCards');

        let card = cardsHTML.children[index];
        card.style.transform = 'rotate(360deg)';
        card.innerHTML = '';
        let src;
        let img = document.createElement('img');
        img.style.width = '100%';
        img.style.height = '100%';

        if (opponentCards[index]['suit'] != 'JOKER') {
            src = `./img/Cards/${opponentCards[index]['suit'].substring(0, opponentCards[index]['suit'].length - 2)}-${opponentCards[index]['value']}.png`;
        } else {
            src = './img/Cards/JOKER.png'
        }

        img.src = src;

        card.appendChild(img);


    }
}

$('#settings').click(function () {
    $('#settings-cont').toggle(200);
});