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
}