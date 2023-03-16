<template>
  <div>
      <!-- Si no hay un nombre de usuario mostramos el boton -->
    <div v-if="!username">
      <button @click="setUsername">Set username</button>
    </div>
      <!-- Si hay un nombre de usuario -->
    <div v-else>
      <p>Logged in as {{ username }}</p>
    <ul id="messages">
        <!-- Muestra los mensajes en una lista -->
      <li v-for="msg in messages" :key="msg">
        <strong>{{ msg.message.username }}:</strong> {{ msg.message.message }}
      </li>
    </ul>
    <!-- Formulario para enviar mensajes -->
    <form id="form" @submit.prevent="sendMessage">
      <input id="input" v-model="message" />
      <button>Send</button>
    </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Peer from "peerjs";

export default {
  data() {
    return {
      messages: [], // Lista de mensajes
      message: "", // Mensaje actual
      socket: null, // Conexión con el servidor de socket.io
      peer: null, // Servidor Peer-to-Peer
      username: null, // Nombre de usuario actual
    };
  },

  mounted() {
    // Conexión al servidor de socket.io
    this.socket = io("http://localhost:3000");

    // Generación de una ID para el usuario
    this.peer = new Peer(undefined, {
      host: "/",
      port: "3000",
      path: "/peerjs",
    });
    
    // Escuchar la conexión con el servidor de socket.io
    this.socket.on("connect", () => {
      console.log("connected to server");
    });

   // Agrega el servidor Peer-to-Peer a la aplicación en la ruta '/peerjs'
    this.socket.on("welcome", (message) => { 
       console.log("🚀 ~ file: App.vue:53 ~ mounted ~ message:", message)
    });
   
    // Escuchar cuando otro usuario se conecta
    this.peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      if (!this.username) {
        this.setUsername();
      }
    });

    // Escuchar los mensajes de chat
    this.socket.on("chat message", (msg) => {
      this.messages.push(msg);
    });
  },

  methods: {
    // Establece el nombre de usuario actual
    setUsername() {
      const username = prompt("Enter your name:");
      if (username) {
        this.username = username;
      }
    },

    // Envía un mensaje al servidor de socket.io
    // ojo en la palabra chat message es igual que en el servidor para enviar o resivir informacion
    sendMessage() {
      this.socket.emit("chat message",  { username: this.username, message: this.message });
      this.message = "";  // Limpia el mensaje actual
    },
  },
};
</script>

<style lang="scss" scoped></style>

