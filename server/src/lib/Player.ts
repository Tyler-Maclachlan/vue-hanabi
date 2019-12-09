import { Card } from './';

export class Player {
  public id: string;
  public username: string;
  public cards: Card[] = [];
  public socketID: any;

  public constructor(username: string) {
    this.id = new Date().toString();
    this.username = username;
  }
}
