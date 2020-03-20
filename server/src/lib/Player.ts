import { Card } from './';

export class Player {
  public id: string;
  public username: string;
  public cards: Card[] = [];

  public constructor(username: string, socketID: string) {
    this.id = socketID;
    this.username = username;
  }
}
