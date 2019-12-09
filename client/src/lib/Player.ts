import { Card } from './Card';

export class Player {
  public id: string;
  public username: string;
  public cards: Card[] = [];

  public constructor(username: string) {
    this.id = new Date().toString();
    this.username = username;
  }
}
