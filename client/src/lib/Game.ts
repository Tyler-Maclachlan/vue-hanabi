import { Deck, Player } from './';

export class Game {
  public deck: Deck;
  public players: Player[] = [];
  public currentPlayer: Player | null = null;

  public constructor() {
    this.deck = new Deck({});
  }

  public newPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(player: Player) {
    const index = this.players.findIndex(p => p.id === player.id);

    if (index >= 0) {
      this.players = this.players.splice(index, 1);
    }
  }

  public startGame() {
    this.currentPlayer = this.players[0];
  }
}
