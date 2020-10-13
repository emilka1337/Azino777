'use strict';

class Casino {
    #balance = null; //Приватнаое поле, содержащее баланс игрока
    #shift = 20; // Сдвиг для шифрования алгоритмом Цезаря

    constructor(name) {
        this.name = name;
        if (name) {
            localStorage.setItem('lastLogin', name);
        }
        if (!name) {
            alert(`Please, enter a valid name!`);
            return;
        }
        this.#balance = localStorage.getItem(name);
        if (this.#balance != undefined) {
            if (isNaN(this.#decryptBalance(this.#shift))) {   // Проверка на вмешательство в LocalStorage shift: 9, 12, 48 lines
                console.log('CHEATING PROHIBITED!!!');
                this.#balance = 1000;
            } else this.#balance = this.#decryptBalance(this.#shift);
        } else this.#balance = 1000;
        console.log(`Welcome, ${this.name}! \nYour money: ${this.#balance}$`);
        document.getElementById('greetings').innerHTML = `Welcome, ${this.name}!`
        document.getElementById('balance').innerHTML = `Balance: ${this.#balance}$`
    }

    //#region casino settings
    get balance() {                          // Позволяет узнать баланс
        return this.#balance
    }

    #changeBalance = (value) => {            // Меняет значение приватного поля #balance
        this.#balance = this.#balance + value;
        document.getElementById('balance').innerText = `Balance: ${this.#balance}$`;
    }

    #encryptBalance = (shift) => {           // Шифрование баланса алгоритмом Цезаря
        let balance = '' + this.#balance;
        let balanceEncrypted = '';

        for (let i of balance) {
            balanceEncrypted += String.fromCharCode(i.charCodeAt() + shift);
        }

        return balanceEncrypted;
    }

    #decryptBalance = (shift) => {          // Расшифровка баланса алгоритмом Цезаря
        let balanceDecrypted = '';

        for (let i of String(localStorage.getItem(this.name))) {
            balanceDecrypted += String.fromCharCode(i.charCodeAt() - shift);
        }

        return +balanceDecrypted;
    }

    #saveProgress = () => localStorage.setItem(this.name, this.#encryptBalance(this.#shift)); // Сохранения прогресса игрока

    resetProgress = () => {                                                 // Сброс прогресса игрока, баланс становится 1000$
        if (confirm('Are you sure you want to reset your progress?')) {
            localStorage.removeItem(this.name);
            this.#changeBalance(1000);
        }
    }
    //#endregion casino settings

    //#region casino games
    playSlotMachine(bet = '100') {                                            // ЗАПУСК СЛОТ-МАШИНЫ
        bet = Methods.betValidation(bet);
        if (!bet) return;
        document.getElementById('slotsBet').value = bet;

        this.#changeBalance(-bet);

        if (this.balance < 0) {
            alert('Not enough money to make a bet');
            this.#changeBalance(bet);
            return;
        }

        let slots = ['Apple', 'Pear', 'Coin', 'Cherry', 'Lemon', 'Orange'];
        let result = [];
        document.getElementById('slots_result').innerText = 'Please, wait...'

        for (let i = 0; i < 3; i++) {
            result.push(slots[Methods.random(0, slots.length)])       // Выдаёт 3 случайных слота, сохраняя в массив
        }

        Slots.makeSlotImages(result, slots);               // Выводит на экран картинки выпавших слотов

        setTimeout(() => {                      // Алгоритм работы слотов
            if (result[0] == result[2] || result[0] == result[1] || result[1] == result[2]) {
                if (result[0] == result[1] && result[1] == result[2]) {
                    console.log(`YOU WIN JACK POT ${bet * 10}$ !!!`);
                    document.getElementById('slots_result').innerText = `YOU WIN JACK POT ${bet * 10}$!!!`
                    this.#changeBalance(bet * 10);
                    console.log(`Your balance is ${this.balance}`);
                } else {
                    console.log(`You win ${bet * 2}!!!`);
                    document.getElementById('slots_result').innerText = `You win ${bet * 2}$ !!!`
                    this.#changeBalance(bet * 2);
                    console.log(`Your balance is ${this.balance}$`);
                }
            } else {
                console.log(`Try again :( \n Your balance is ${this.balance}$`);
                document.getElementById('slots_result').innerText = `Try again :(`;
                setTimeout(() => document.getElementById('slots_result').innerText = '', 5000)
            }

            if (this.balance <= 0) {
                alert('You are bankrupt :(');
                if (confirm('Reset game?')) {
                    this.resetProgress();
                }
            }

            this.#saveProgress();
        }, 6000)
    }

    playRoulette(bet = '100') {                                               // ЗАПУСК ИГРЫ В РУЛЕТКУ
        bet = Methods.betValidation(bet);
        if (!bet) return;
        document.getElementById('rouletteBet').value = bet;                   // Нужно, чтобы привести ужасную ставку в нормальный вид

        this.#changeBalance(-bet);

        if (this.balance < 0) {
            alert('Not enough money to make a bet');
            this.#changeBalance(bet);
            return;
        }

        console.log(`Your bet: ${bet}`);

        let numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 37, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
        console.log(numbers.length)
        let randomNumber = Methods.random(0, 38);
        let color;
        let even;
        let win = 0;
        let GameMode;

        Roulette.rotateRoulette(numbers.indexOf(randomNumber));
        let indexOfNumber = numbers.indexOf(randomNumber);

        if ((indexOfNumber % 2 == 0) && (randomNumber != 0)) { // Определение цвета
            color = 'red';
        } else if (!randomNumber) {      // Проверка на 0/!0
            color = 'green';
        } else color = 'black';

        if (randomNumber % 2 == 0) {   // Проверка на чётное/нечётное
            even = true;
        } else even = false;

        let gameModes = document.getElementsByName('gameMode');  // Выбор режима игры

        for (let i = 0; i < 4; i++) {                            // Проверка отмеченных радио-кнопок
            if (gameModes[i].checked) {
                console.log(`Game mode: ${i + 1}`);
                GameMode = i + 1;
                break;
            }
        }

        // Выбор игры
        if (GameMode == 1) {
            // let userColor = +prompt('1 - black \n2 - red');         // Игра в цвета

            let colors = document.getElementsByName('color');
            let userColor = 1;

            for (let colorChoise of colors) {
                if (colorChoise.checked) {
                    break;
                } else userColor++;
            }

            if (userColor == 1) {
                userColor = 'black'
            } else if (userColor == 2) {
                userColor = 'red'
            } else if (userColor == 3) {
                userColor = 'green';
            } else {
                alert('Please, select color first');
                return;
            }

            if (userColor == color) {                               // Сверка результатов
                if (userColor == color && userColor == 'green') {
                    win += bet * 36;
                } else win += bet * 2;

                setTimeout(function () {
                    console.log(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                    console.log(`Congrats, you win ${bet * 2}!`);
                    alert(`Congrats, you win ${bet * 2}!`);
                }, 5500)

            } else {
                win = 0;
                setTimeout(function () {
                    console.log(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                    console.log('Fail :( Try again!');
                    alert('Fail :( Try again!');
                }, 5500)
            }
        }

        else if (GameMode == 2) {                                   // Игра в чётное/нечётное

            let choises = document.getElementsByName('evenOdd');
            let userEven = 1;

            for (let choice of choises) {
                if (choice.checked) {
                    break;
                } else userEven++;
            }

            if (userEven == 1) {                // Проверка на чётность
                userEven = true;
            } else if (userEven == 2) {
                userEven = false
            }

            if (userEven == even) {             // Сверка результатов
                win += bet * 2;
                setTimeout(function () {
                    console.log(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                    console.log(`Congrats, you win ${bet * 2}!`);
                    alert(`Congrats, you win ${bet * 2}!`);
                }, 5500)
            } else {
                win = 0;
                setTimeout(function () {
                    console.log(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                    console.log('Fail :( Try again!');
                    alert('Fail :( Try again!');
                }, 5500)
            }
        }

        else if (GameMode == 3) {                                   // Игра в диапазон
            // let userRange = +prompt('1 - (0 - 12) \n 2 - (13 - 24) \n 3 - (25 - 36)')
            let ranges = document.getElementsByName('range');
            let userRange = 1;

            for (let range of ranges) {
                if (range.checked) {
                    break;
                } else userRange++;
            }

            if (userRange == 1) {                                   // Сверка результатов
                if (randomNumber >= 0 && randomNumber <= 12) {
                    win += bet * 3;
                    setTimeout(function () {
                        console.log(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                        console.log(`Congrats, you win ${bet * 2}!`);
                        alert(`Congrats, you win ${bet * 3}!`);
                    }, 5500)
                } else {
                    win = 0;
                    setTimeout(function () {
                        console.log(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                        console.log('Fail :( Try again!');
                        alert('Fail :( Try again!');
                    }, 5500)
                }
            } else if (userRange == 2) {
                if (randomNumber > 12 && randomNumber <= 24) {
                    win += bet * 3;
                    setTimeout(function () {
                        console.log(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                        console.log(`Congrats, you win ${bet * 2}!`);
                        alert(`Congrats, you win ${bet * 3}!`);
                    }, 5500)
                } else {
                    win = 0;
                    setTimeout(function () {
                        alert(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                        console.log('Fail :( Try again!');
                        alert('Fail :( Try again!');
                    }, 5500)
                }
            } else if (userRange == 3) {
                if (randomNumber > 24 && randomNumber <= 37) {
                    win += bet * 3;
                    setTimeout(function () {
                        alert(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                        console.log(`Congrats, you win ${bet * 2}!`);
                        alert(`Congrats, you win ${bet * 3}!`);
                    }, 5500)
                } else {
                    win = 0;
                    setTimeout(function () {
                        alert(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                        console.log('Fail :( Try again!');
                        alert('Fail :( Try again!');
                    }, 5500)
                }
            } else {
                console.log('You left the game...');
            }
        }

        else if (GameMode == 4) {                                   // Игра в угадай число
            let userNumber = document.getElementById('rouletteNumber').value;

            userNumber = +userNumber.match(/\d/gi).join('');

            if (userNumber > 37 || userNumber < 0) {
                alert('Number must be from 0 to 37!');
                return;
            }

            if (userNumber == randomNumber) {
                win += bet * 36;
                setTimeout(function () {
                    alert(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                    console.log(`Congrats, you win ${bet * 36}!`);
                    alert(`Congrats, you win ${bet * 36}!`);
                }, 5500)
            } else {
                win = 0;
                setTimeout(function () {
                    alert(`Random number is: ${randomNumber} \nColor: ${color} \nEven: ${even}`);
                    console.log('Fail :( Try again!');
                    alert('Fail :( Try again!');
                }, 5500)
            }
        }

        if (this.balance <= 0) {                                    // Проверка на банкротство
            alert('You are bankrupt :(');
            if (confirm('Reset game?')) {
                this.resetProgress();
            }
        }

        setTimeout(                                                 // Автосброс рулетки
            Roulette.resetRoulette,
            20000
        );

        console.log(`Your total reward is ${win}$`);
        this.#changeBalance(win);
        console.log(`Balance: ${this.balance}`);
        this.#saveProgress();
    }

    playPoker(bet = '100', ...playersName) {                                  // ЗАПУСК ИГРЫ В ПОКЕР
        let suits = ['Пики \u2664', 'Трефы \u2667', 'Червы \u2665', 'Бубны \u2662'];
        let cardsValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];
        let players = [];

        class PokerCombinations {
            static HighCard(player) {           // Поиск высшей карты
                console.log(player);
                let high = 0;

                for (let card in player) {
                    if (cardsValue.indexOf(player[card]['value']) > high) {
                        high = cardsValue.indexOf(player[card]['value']);
                    } else continue;
                }

                return cardsValue[high];
            }

            static Pairs(player) {              // Поиск пары (не работает)
                player.pairs = 0;

                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        if (player[`card_${i}`]['value'] == player[`card_${j}`]['value'] && i != j) {
                            player.pairs++;
                        }
                    }
                }

                return player.pairs / 2;
            }
        }

        for (let suit of suits) {               // Генерация колоды из 52 карт
            for (let value of cardsValue) {
                let card = {};
                card.suit = suit;
                card.value = value;
                deck.push(card);
            }
        }

        for (let player of playersName) {       // Раздача карт игрокам
            let newPlayer = {};

            for (let i = 0; i < 5; i++) {
                newPlayer.name = player;
                Object.defineProperty(newPlayer, 'name', { enumerable: false })
                newPlayer[`card_${i}`] = deck.splice(Methods.random(0, deck.length), 1)[0];
            }

            players.push(newPlayer);
        }

        deck = Methods.mixObjectArray(deck);    // Перемешивание колоды

        for (let player of players) {
            console.log(PokerCombinations.HighCard(player));
            console.log(PokerCombinations.Pairs(player))
        }
    }

    playDurak(bet = '100', ...players) {                                      // ЗАПУСК ИГРЫ В ДУРАК
        class Durak {
            static takeCard(player, attack) {
                let name = player.name;
                player = JSON.stringify(player);
                let counter = 0;

                for (let card in player) {
                    player = player.replace(/card\d/, `card_${counter}`)
                }

                player = JSON.parse(player);
                player[`card_${counter++}`] = attack;
                player.name = name;
                Object.defineProperty(player, 'name', { enumerable: false });
                alert(`${player.name}, вы забрали себе карту ${Object.values(attack).join(', ')}`);
            }
        }

        let suits = ['Пики \u2664', 'Трефы \u2667', 'Червы \u2665', 'Бубны \u2662'];
        let cardsValue = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];

        if (players.length > 6) {               // Контроль количества игроков
            if (players.length <= 8) {
                if (confirm('В классического дурака могут играть не больше 6-ти игроков! Желаете увеличить колоду с 36 карт до 52?')) {
                    for (let value = 1; value < 6; value++) {
                        cardsValue.unshift(`${i}`);
                    }
                } else return;
            } else {
                alert('Слишком много игроков! Максимум возможно 8 игроков!');
            }
        }

        for (let suit of suits) {               // Генерация колоды из 36 карт
            for (let value of cardsValue) {
                let card = {};
                card.suit = suit;
                card.value = value;
                card.power = cardsValue.indexOf(value) + 1;
                Object.defineProperty(card, 'power', { enumerable: false });
                deck.push(card);
            }
        }

        for (let player of players) {           // Раздача карт игрокам
            let newPlayer = {};

            for (let i = 0; i < 6; i++) {
                newPlayer.name = player;
                Object.defineProperty(newPlayer, 'name', { enumerable: false })
                newPlayer[`card_${i}`] = deck.splice(Methods.random(0, deck.length), 1)[0];
            }

            players[players.indexOf(player)] = newPlayer;
        }

        deck = Methods.mixObjectArray(deck);    // Перемешивание колоды

        let trump = deck[deck.length - 1];      // Назначение козыря

        for (let card of deck) {                // Назначение козырных карт
            if (card.suit == trump.suit) {
                card.trump = true;
                Object.defineProperty(card, 'trump', { enumerable: false });
            }
        }

        for (let player of players) {           // Назначение козырных карт игрокам
            for (let card in player) {
                if (player[card].suit == trump.suit) {
                    player[card].trump = true;
                    Object.defineProperty(player[card], 'trump', { enumerable: false });
                }
            }
        }

        let attack;

        game: for (let player = 0; player < players.length; player++) {   // Основной цикл игры
            let playerCards = ``;
            let playerCardsArray = [];
            let listCounter = 1;

            for (let card in players[player]) {                     // Объявление карт игрока
                if (players[player][card].trump) {
                    playerCards += `${listCounter}) ${players[player][card].value} ${players[player][card].suit} *КОЗЫРЬ* \n`;
                    playerCardsArray.push(players[player][card]);
                    listCounter++;
                } else {
                    playerCards += `${listCounter}) ${players[player][card].value} ${players[player][card].suit} \n`;
                    playerCardsArray.push(players[player][card]);
                    listCounter++;
                }
            }

            alert(`${players[player].name}, Ваши карты: \n\n ${playerCards}`);

            if (attack) {                                           // Отбитие предыдущей карты
                if (!attack.trump) {                                // Если нужно отбить козырную карту
                    alert(`${players[player].name}, вам нужно отбить карту ${Object.values(attack).join(', ')}`);

                    let beatOff = +prompt(`${players[player].name}, выберите карту, которой отобьёте ${Object.values(attack).join(', ')} \n\n ${playerCards}`);
                    if (!beatOff) {
                        Durak.takeCard(players[player], attack);
                        attack = undefined;
                        continue game;
                    } else {
                        beatOff = playerCardsArray[beatOff - 1];            // Назначение карты, которой игрок отбивает
                        alert(`${players[player].name}, вы выбрали карту ${Object.values(beatOff).join(', ')}`);
                    }

                    if (beatOff.power > attack.power || beatOff.trump) {      // Проверка, можно ли отбить этой картой
                        alert(`Карта отбита!`);
                    } else {
                        if (beatOff.trump) {
                            alert(`Нельзя отбить карту ${Object.values(attack).join(', ')} картой ${Object.values(beatOff).join(', ')} *КОЗЫРЬ*`);
                        } else {
                            alert(`Нельзя отбить карту ${Object.values(attack).join(', ')} картой ${Object.values(beatOff).join(', ')}`);
                        }
                        Durak.takeCard(players[player], attack);
                        attack = undefined;
                        continue game;
                    }
                } else if (attack.trump) {                            // Если нужно отбить обычную карту
                    alert(`${players[player].name}, вам нужно отбить карту ${Object.values(attack).join(', ')}, *КОЗЫРЬ*`);

                    let beatOff = +prompt(`${players[player].name}, выберите карту, которой отобьёте ${Object.values(attack).join(', ')} *КОЗЫРЬ* \n\n ${playerCards}`);
                    if (!beatOff) {
                        Durak.takeCard(players[player], attack);
                        attack = undefined;
                        continue game;
                    } else {
                        beatOff = playerCardsArray[beatOff - 1];            // Назначение карты, которой игрок отбивает
                        alert(`${players[player].name}, вы выбрали карту ${Object.values(beatOff).join(', ')}`);
                    }

                    if (beatOff.trump && beatOff.power > attack.power) {      // Проверка, можно ли отбить этой картой
                        alert(`Карта отбита!`);
                    } else {
                        if (beatOff.trump) {
                            alert(`Нельзя отбить карту ${Object.values(attack).join(', ')} картой ${Object.values(beatOff).join(', ')} *КОЗЫРЬ*`);
                        } else {
                            alert(`Нельзя отбить карту ${Object.values(attack).join(', ')} *КОЗЫРЬ* картой ${Object.values(beatOff).join(', ')}`);
                        }
                        Durak.takeCard(players[player], attack);
                        attack = undefined;
                        continue game;
                    }
                }
            }

            //#region ходы игроков?
            if (player + 1 != players.length) {
                alert(`${players[player].name}, вы ходите на игрока ${players[player + 1].name}`);
                attack = +prompt(`${players[player].name}, выберите карту, которой пойдете на ${players[player + 1].name} \n\n ${playerCards}`);
                if (playerCardsArray[attack - 1].trump) {
                    alert(`Вы выбрали карту ${Object.values(playerCardsArray[attack - 1]).join(', ')} *КОЗЫРЬ*`);
                } else {
                    alert(`Вы выбрали карту ${Object.values(playerCardsArray[attack - 1]).join(', ')}`);
                }
                attack = playerCardsArray[attack - 1];
            } else {
                alert(`${players[player].name}, вы ходите на игрока ${players[0].name}`);
                attack = +prompt(`${players[player].name}, выберите карту, которой пойдете на ${players[0].name} \n\n ${playerCards}`);
                if (playerCardsArray[attack - 1].trump) {
                    alert(`Вы выбрали карту ${Object.values(playerCardsArray[attack - 1]).join(', ')} *КОЗЫРЬ*`);
                } else {
                    alert(`Вы выбрали карту ${Object.values(playerCardsArray[attack - 1]).join(', ')}`);
                }
                attack = playerCardsArray[attack - 1];

                player = -1;
                break;
            }
            //#endregion ходы игроков?
        }

        console.log(trump);
        console.log(deck);
        return players;
    }

    playJoker(bet = '100') {                                                  // ЗАПУСК ИГРЫ В ДЖОКЕР
        bet = Methods.betValidation(bet);
        if (!bet) return;
        document.getElementById('jokerBet').value = bet;

        this.#changeBalance(-bet);

        if (this.balance < 0) {
            alert('Not enough money to make a bet');
            this.#changeBalance(bet);
            return;
        }

        let DeckGenerator = new Deck();

        let deck = [{ 'suit': 'JOKER', 'value': 'JOKER' }].concat(DeckGenerator.generateDeck52()),
            playerCards = [],
            opponentCards = [];


        deck = Deck.mixDeck(deck);

        playerCards = deck.splice(0, deck.length / 2);
        opponentCards = deck.splice(0, deck.length);

        playerCards = Methods.removePairsJoker(playerCards);
        opponentCards = Methods.removePairsJoker(opponentCards);

        if (playerCards.length > 9) {
            this.playJoker('' + bet);
            return;
        }

        document.getElementById('playerCards').innerHTML = '';
        document.getElementById('opponentCards').innerHTML = '';

        Joker.fillOpponentCards(opponentCards);
        Joker.fillPlayerCards(playerCards);

        let opponentTurn = function () {
            let gameOver = false;
            let selectedCard = Methods.random(0, playerCards.length);
            let card = JSON.stringify(playerCards[selectedCard]);
            playerCards.splice(selectedCard, 1);
            opponentCards.push(JSON.parse(card));

            alert(`Оппонент забрал у вас карту ${JSON.parse(card)['suit']} ${JSON.parse(card)['value']}`);

            opponentCards = Methods.removePairsJoker(opponentCards);

            Joker.clearCardsList('player');
            Joker.clearCardsList('opponent');
            Joker.fillOpponentCards(opponentCards);
            Joker.fillPlayerCards(playerCards);

            if (playerCards.length == 0) {
                alert('Вы победили!');
                casino.#changeBalance(bet * 2);
                gameOver = true;
            } else if (opponentCards.length == 0) {
                alert('Вы проиграли :(');
                gameOver = true;
            }

            if (!gameOver) playerTurn();
        }

        let playerTurn = function () {
            let opCardsCollection = document.getElementsByClassName('opponent-card');
            let gameOver = false;

            for (let card of opCardsCollection) {
                card.addEventListener('click', function () {
                    console.log(opponentCards[card.value]);

                    Joker.animateSelectedOpponentCard(opponentCards, card.value);

                    let opponentCard = JSON.stringify(opponentCards[card.value]);
                    opponentCards.splice(card.value, 1);
                    playerCards.push(JSON.parse(opponentCard));

                    playerCards = Methods.removePairsJoker(playerCards);

                    setTimeout(() => {
                        Joker.clearCardsList('player');
                        Joker.clearCardsList('opponent');
                        Joker.fillOpponentCards(opponentCards);
                        Joker.fillPlayerCards(playerCards);
                        if (playerCards.length == 0) {
                            alert('Вы победили!');
                            casino.#changeBalance(bet * 2);
                            gameOver = true;
                        } else if (opponentCards.length == 0) {
                            alert('Вы проиграли :(');
                            gameOver = true;
                        }
                        if (!gameOver) setTimeout(opponentTurn, 500);
                    }, 1500);
                });
            }
        }

        playerTurn();
    }
    //#endregion casino games
}

(function () {                                   // Проверка цветовой схемы и анимаций
    if (localStorage.getItem('colorMode') == 'light' || !localStorage.getItem('colorMode')) {
        Interface.lightMode();
    } else if (localStorage.getItem('colorMode') == 'dark') {
        Interface.darkMode();
    } else {
        throw new Error('Error setting color scheme');
    }

    // if (localStorage.getItem('animations') == 1 || !localStorage.getItem('animations')) {
    //     Interface.enableAnimations();
    // } else if (localStorage.getItem('animations') == 0) {
    //     Interface.disableAnimations();
    // } else {
    //     throw new Error('Error setting animations');
    // }
}());

let casino;                                     // Объявление глобальной переменной casino

setTimeout(() => {                              // Запрос имени игрока
    // casino = new Casino(prompt('Please, enter your name', localStorage.getItem('lastLogin', name) || ''));
    casino = new Casino('Эмилька');
}, 500);






























// static twoPair(player) {

// }

// static Triple(player) {

// }

// static Straight(player) {

// }

// static Flush(player) {

// }

// static fullHouse() {

// }

// static Four(player) {

// }

// static straightFlush(player) {

// }

// static royalFlush(player) {

// }