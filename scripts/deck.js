class Deck {
    #suits = suits = ['Пики \u2664', 'Трефы \u2667', 'Червы \u2665', 'Бубны \u2662'];
    #values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    generateDeck36() {                    // Генерация колоды из 36 карт
        let deck = [];

        for (let suit of this.#suits) {
            for (let value of this.#values.slice(4, this.#values.length)) {
                deck.push({
                    'suit': suit,
                    'value': value
                });
            }
        }

        return deck;
    }

    generateDeck52() {                    // Генерация колоды из 52 карт
        let deck = [];

        for (let suit of this.#suits) {
            for (let value of this.#values) {
                deck.push({
                    'suit': suit,
                    'value': value
                });
            }
        }

        return deck;
    }

    generateDeck52andJoker() {                    // Генерация колоды из 52 карт и джокера
        let deck = [{ 'suit': 'JOKER', 'value': 'JOKER' }];

        for (let suit of this.#suits) {
            for (let value of this.#values) {
                deck.push({
                    'suit': suit,
                    'value': value
                });
            }
        }

        return deck;
    }
}