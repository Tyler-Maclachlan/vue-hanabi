import io from 'socket.io-client';

export const createSocket = () => {
  const socket = io('http://localhost:4200');

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  return socket;
};

function onConnect(e: any) {
  console.log(e);
}

function onDisconnect(e: any) {
  console.log(e);
}

function joinRoom(socket: SocketIOClient.Socket, room: string, username: string) {
  socket.emit('join', {room, username});
}