'use strict'

class Methods {
    static random = (min, max) => Math.floor(Math.random() * (max - min)) + min;  // Формула получения случайного числа

    static betValidation = (bet) => {
        if (!bet) {
            if (confirm(`Your bet is 100$. Is it okay?`)) {
                bet = '100';
            } else {
                alert('You left the game...')
                return false;
            }
        }

        bet = +bet.match(/\d/gi).join('');

        if (bet) {
            return bet
        } else {
            if (bet == 0) {
                alert('Please, make a bet before start');
                return false;
            } else if (bet == '') {
                alert('Your bet is not contain any number');
                return false
            }
        }
    }

    static mixArray(array) {                     // Перемешивание массива
        for (let i = 0; i < array.length; i++) {
            let randomNumber = this.random(0, array.length);
            [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
        }

        return array;
    }

    static generateDeck52() {                    // Генерация колоды из 52 карт
        let suits = ['Пики \u2664', 'Трефы \u2667', 'Червы \u2665', 'Бубны \u2662'],
            values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
            deck = [];

        for (let suit of suits) {
            for (let value of values) {
                deck.push({
                    'suit': suit,
                    'value': value
                });
            }
        }

        return deck;
    }

    static removePairsJoker(player, showThrowedCard) {
        for (let i = 0; i < player.length; i++) {
            for (let j = 0; j < player.length; j++) {
                if (player[i]['value'] == player[j]['value'] && i != j) {
                    if (showThrowedCard) {
                        alert(`Была выброшена карта ${player[i]['suit']} ${player[i]['value']} и ${player[j]['suit']} ${player[j]['value']}`);
                    }
                    if (i < j) {
                        player.splice(j, 1);
                        player.splice(i, 1);
                        this.removePairsJoker(player, showThrowedCard);
                    } else {
                        player.splice(i, 1);
                        player.splice(j, 1);
                        this.removePairsJoker(player, showThrowedCard);
                    }

                    break;
                }
            }
        }

        return player;
    }
}