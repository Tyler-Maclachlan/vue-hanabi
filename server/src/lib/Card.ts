export interface ICard {
  color: string;
  num: number;
}

export class Card implements ICard {
  public color: string;
  public num: number;

  public constructor(color: string, num: number) {
    this.color = color;
    this.num = num;
  }
}
