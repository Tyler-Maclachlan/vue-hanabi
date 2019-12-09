import { Card, SuiteColors } from './';

export interface IDeck {
  cards: Card[];
}

export class Deck implements IDeck {
  public cards: Card[] = [];

  public constructor(options: any) {
    // tslint:disable-next-line: forin
    for (const color in SuiteColors) {
      for (let i = 0; i < 3; i++) {
        this.cards.push({
          num: 1,
          color
        });
      }

      for (let c = 2; c < 5; c++) {
        for (let z = 0; z < 2; z++) {
          this.cards.push({
            num: c,
            color
          });
        }
      }

      this.cards.push({
        num: 5,
        color
      });
    }
  }

  public drawCard(): Card {
    const index = Math.ceil(Math.random() * this.cards.length);
    const card = this.cards[index];
    this.cards = this.cards.splice(index, 1);

    return card;
  }
}
