import { Card, SuiteColors, getSuiteFromColor } from './';

export interface IDeck {
  cards: Card[];
}

export class Deck implements IDeck {
  public cards: Card[] = [];

  public constructor(options: any) {
    // tslint:disable-next-line: forin
    for (const color in SuiteColors) {
      for (let i = 0; i < 3; i++) {
        this.cards.push(new Card(getSuiteFromColor(color), 1));
      }

      for (let c = 2; c < 5; c++) {
        for (let z = 0; z < 2; z++) {
          this.cards.push(new Card(getSuiteFromColor(color), c));
        }
      }

      this.cards.push(new Card(getSuiteFromColor(color), 5));
    }
  }

  public drawCard(): Card | null {
    if (this.cards.length) {
      const index = Math.ceil(Math.random() * this.cards.length);
      const card = this.cards[index];
      this.cards = this.cards.splice(index, 1);

      return card;
    }

    return null;
  }
}
