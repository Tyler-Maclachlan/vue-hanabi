import { Player } from './';
import { Deck } from './Deck';

export class Room {
  public players: Map<string, Player>;
  public deck: Deck;
  public currentPlayer: Player;
  public gameRunning = false;

  public constructor() {
    this.players = new Map();
    this.deck = new Deck({});
  }

  public addPlayer(player) {
    this.players.set(player.id, player);
  }

  public removePlayer(player) {
    if (this.players.has(player.id)) {
      this.players.delete(player.id);
    }
  }
}
