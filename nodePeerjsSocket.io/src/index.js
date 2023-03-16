const express = require("express"); // Importa el módulo 'express' para crear la aplicación
const app = express(); // Crea una nueva instancia de la aplicación
const http = require("http").createServer(app); // Crea un servidor HTTP y lo vincula con la aplicación
const { ExpressPeerServer } = require("peer"); // Importa el módulo 'peer' para crear un servidor Peer-to-Peer
const io = require("socket.io")(http, {    // Importa el módulo 'socket.io' y lo vincula con el servidor HTTP
  cors: {
    origin: "*",  // Configura el acceso CORS para cualquier origen
  },
});

const peerServer = ExpressPeerServer(http, {
  debug: true, // Habilita el modo de depuración para el servidor Peer-to-Peer
});

// Maneja el evento de conexión de un cliente en el servidor Peer-to-Peer
peerServer.on('connection', (client) => {
  console.log(`Client connected with Id peerjs ${client.getId()}`);
});

// Agrega el servidor Peer-to-Peer a la aplicación en la ruta '/peerjs'
app.use("/peerjs", peerServer);

// Maneja el evento de conexión de un cliente en el servidor de socket.io
io.on("connection", (socket) => {
  console.log('Nueva conexión con el Id:socket.io', socket.id);

   // Envía un mensaje de bienvenida al nuevo usuario
   socket.emit("welcome", "¡Bienvenido al chat!");

   //ojo la palabra que esta aqui chat message tambien debe estar 
   // Maneja el evento de recepción de un mensaje de chat
  socket.on("chat message", (msg) => {
    console.log(`message: ${msg}`);

     // Envía el mensaje de chat a todos los clientes conectados
    io.emit("chat message", { username: socket.username, message: msg });
  });

  // Maneja el evento de desconexión de un cliente
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Inicia el servidor HTTP en el puerto 3000
http.listen(3000, () => {
  console.log("listening on *:3000");
});
