import { Player, Deck, Card, SuiteColors } from './';

export interface Clue {
  num?: number;
  color?: SuiteColors;
}

export class Room {
  private _id: string;
  private _name: string;
  private _players: Map<string, Player>;
  private _deck: Deck;
  private _currentPlayer: Player;
  private _lives = 3;
  private _cluesAvailable = 8;
  private _gameStarted = false;
  private _discards: Card[] = [];
  private _played: Map<SuiteColors, Card[]>;
  private _owner: Player;
  private turnsToEnd = 0;

  public constructor(name = new Date().getTime() + '') {
    this._id = `Room:${new Date().getTime() + Math.random() * 100}`;
    this._name = name;
    this._players = new Map();
    this._deck = new Deck({});
    this._played = new Map();
  }

  public get name() {
    return this._name;
  }

  public get players() {
    return this._players;
  }

  public get lives() {
    return this._lives;
  }

  public get clues() {
    return this._cluesAvailable;
  }

  public get isGameRunning() {
    return this._gameStarted;
  }

  public get discards() {
    return this._discards;
  }

  public get played() {
    return this._played;
  }

  public get currentPlayer() {
    return this._currentPlayer;
  }

  public get owner() {
    return this._owner;
  }

  public addPlayer(player: Player): void {
    if (this._players.size === 0) {
      this._owner = player;
    }
    this._players.set(player.id, player);
  }

  public removePlayer(player: Player) {
    if (this._players.has(player.id)) {
      this._players.delete(player.id);
    }
  }

  public startGame(player: Player): boolean {
    if (player.id === this._owner.id) {
      this._currentPlayer = this._players.get(this._players.keys[0]);

      for (const playerID in this.players) {
        const cardCount = this._players.size < 4 ? 5 : 4;
        const player = this._players.get(playerID);

        for (let i = 0; i < cardCount; i++) {
          player.cards.push(this._deck.drawCard());
        }
      }

      this.turnsToEnd = this._players.size;
      this._gameStarted = true;
      return true;
    }

    return false;
  }

  public nextTurn(player: Player) {
    if (player.id === this._currentPlayer.id) {
      const playerIDs = Array.from(this._players.keys());
      const index = playerIDs.findIndex(id => id === this._currentPlayer.id);

      if (index + 1 > playerIDs.length) {
        this._currentPlayer = this._players.get(playerIDs[0]);
      } else {
        this._currentPlayer = this._players.get(playerIDs[index + 1]);
      }
      if (player.cards.length < (this._players.size < 4 ? 5 : 4)) {
        player.cards.push(this._deck.drawCard());
      }
      return true;
    }
    return false;
  }

  public getCard(playerID: string) {
    const player = this._players.get(playerID);
    const card = this._deck.drawCard();

    player.cards.push(card);
    return card;
  }

  public playCard(card: Card, playerID: string): void {
    const { color, num } = card;
    let valid = false;

    if (this._played.has(color)) {
      const suite = this._played.get(color);
      const lastNum = suite[suite.length - 1].num;
      if (num === lastNum + 1) {
        valid = true;
        suite.push(card);
      }
    } else if (card.num === 1) {
      valid = true;
      this._played.set(card.color, [card]);
    } else {
      this._lives--;
    }

    if (valid && num === 5 && this._cluesAvailable < 8) {
      this._cluesAvailable++;
    }

    this.removeCard(card, playerID, !valid);
  }

  public giveClue(player: Player, playerID: string, clue: Clue) {
    if (this._cluesAvailable > 0 && player.id === this._currentPlayer.id) {
      const player = this._players.get(playerID);
      player.cards.forEach(c => {
        if (clue.num && c.num === clue.num) {
          c.clued.num = true;
        } else if (clue.color && c.color === clue.color) {
          c.clued.color = true;
        }
      });

      this._cluesAvailable--;
      return true;
    }

    return false;
  }

  public discard(card: Card, playerID: string) {
    this.removeCard(card, playerID);
    if (this._cluesAvailable < 8) {
      this._cluesAvailable++;
    }
  }

  private removeCard(card: Card, playerID: string, discard = true) {
    if (discard) {
      this._discards.push(card);
    }
    const player = this._players.get(playerID);

    player.cards = player.cards.filter(c => c.color !== card.color && c.num !== card.num);
  }
}
