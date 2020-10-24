const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
// Create an instance of Socket.io
const io = socketio(server);

app.use(cors());
// socket here is a specific client instance of a socket
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(user);
    // if there is an error , wel will be automatically kicked out outside of this function, because of the return
    if (error) return callback(error);

    // the emit here will going to emit a message from the backend to the front end
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    //   socket.broadcast will send a message to everyone besides that specific user
    // .to(user.room) : send a message to a specific room
    // let everyone in this room beside this user knows that he joined
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();

    // the callback will trigger some response immediately after the socket.on join event has been emitted,
    // so we can use the callback for error handling for example

    // const error = true;
    // if (error) {
    //   callback({ error: "error" });
    // }
  });
  // in the backen here, we will be waiting for a send message and the emiting part will happen on the front end
  // the on method, has a event name, and a callback function that will be executed after the event is emited
  socket.on("sendMessage", (message, callback) => {
    // get the user who sent a message
    // socket is a specific client instance, this the user..
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });
  socket.on("disconnect", () => {
    //  Remove our user
    const user = removeUser(socket.id);

    // let other user know that he left
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
    }
  });
});

// Call the router as a middelware
app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
