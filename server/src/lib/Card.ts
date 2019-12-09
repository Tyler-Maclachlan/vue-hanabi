import { SuiteColors } from '.';

export interface ICard {
  color: string;
  num: number;
}

export class Card implements ICard {
  public color: SuiteColors;
  public num: number;
  public clued: {
    num: boolean;
    color: boolean;
  } = { num: false, color: false };

  public constructor(color: SuiteColors, num: number) {
    this.color = color;
    this.num = num;
  }
}
