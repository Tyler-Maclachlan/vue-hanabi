import * as socketIO from 'socket.io';
import * as http from 'http';

import { Room, Player, Clue, Card } from './lib';

const rooms = new Map<string, Room>();
const users = new Map<string, { player?: Player; room?: Room }>();

const app = http
  .createServer(() => {
    // noop
  })
  .listen(4200);

const io = socketIO.listen(app);

io.on('connection', socket => {
  const _user: {
    player?: Player;
    room?: Room;
  } = {
    player: null,
    room: null
  };

  if (!users.has(socket.id)) {
    users.set(socket.id, {});
  }

  socket.on('join', ({ room, username }) => {
    if (!rooms.has(room)) {
      rooms.set(room, new Room(room));
    }

    const _room = rooms.get(room)!;

    const player = new Player(username, socket.id);
    const user = users.get(socket.id);

    user.player = player;
    user.room = _room;
    _user.player = player;
    _user.room = _room;

    _room.addPlayer(player);
  });

  socket.on('start-game', () => {
    if (_user.player && _user.room) {
      if (_user.room.startGame(_user.player)) {
        socket.to(_user.room.name).emit('room-updated', JSON.stringify(_user.room));
      }
    }
  });

  socket.on('end-turn', () => {
    if (_user.player && _user.room) {
      if (_user.room.nextTurn(_user.player)) {
        socket.to(_user.room.name).emit('room-updated', JSON.stringify(_user.room));
      }
    }
  });

  socket.on('give-clue', ({ clue }, cb) => {
    if (_user.player && _user.room) {
      const _clue = clue as Clue;

      if ((_clue.num && _clue.color) || (!_clue.num && !_clue.color)) {
        cb(new Error('Invalid Clue'));
      }

      if (_user.room.giveClue(_user.player, socket.id, _clue)) {
        socket.to(_user.room.name).emit('room-updated', JSON.stringify(_user.room));
        cb(true);
      } else {
        cb(false);
      }
    }
  });

  socket.on('play-card', ({ card }: { card: Card }, cb) => {
    if (_user.player && _user.room) {
      _user.room.playCard(card, socket.id);
      cb(true);
      socket.to(_user.room.name).emit('room-updated', JSON.stringify(_user.room));
    }
    cb(false);
  });

  socket.on('disconnect', () => {
    users.delete(socket.id);
  });
});
