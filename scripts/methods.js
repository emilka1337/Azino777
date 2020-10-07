'use strict'

class Methods {
    static random = (min, max) => Math.floor(Math.random() * (max - min)) + min;  // Формула получения случайного числа

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
}