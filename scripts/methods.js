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
            alert(`Your bet is ${bet}`);
        } else {
            alert('Your bet is not contain any number');
            return false
        }

        if (bet == 0) {
            alert('Please, make a bet before start');
            return false;
        }

        return bet;
    }

    static mixArray(array) {                     // Перемешивание массива
        for (let i = 0; i < array.length; i++) {
            let randomNumber = this.random(0, array.length);
            [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
        }

        return array;
    }

    static mixObjectArray(array) {               // Перемешивание массива из объектов 
        let stringArr = [];

        for (let object of array) {
            stringArr.push(JSON.stringify(object));
        }

        stringArr = this.mixArray(stringArr);
        let newArr = [];

        for (let string of stringArr) {
            newArr.push(JSON.parse(string));
        }

        return newArr;
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
                    } else {
                        player.splice(i, 1);
                        player.splice(j, 1);
                    }

                    break;
                }
            }
        }

        return player;
    }

    // static addListenerToOpponentCards(opponent) {
    //     let cards = document.getElementsByClassName('opponent-card');

    //     for (let card of cards) {
    //         card.addEventListener('click', function() {
    //             console.log(opponent[card.value])
    //         });
    //     }
    // }
}