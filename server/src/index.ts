import * as socketIO from 'socket.io';
import * as http from 'http';

import { Room } from './lib';

const rooms = new Map<string, Room>();

const app = http
  .createServer(() => {
    // noop
  })
  .listen(4200);

const io = socketIO.listen(app);

io.on('connection', socket => {
  socket.on('join', data => {
    console.log(data);
  });
});
