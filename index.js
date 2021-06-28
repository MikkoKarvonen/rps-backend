const express = require("express");
const app = express();
const socket = require("socket.io");
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

const io = socket(server);
const users = {};

io.on("connection", (socket) => {
  socket.on("rps", (chosen) => {
    io.emit("rps", chosen.msg);
    console.log(chosen.id);
  });

  socket.on("login", function (data) {
    console.log("a user " + data.userId + " connected");
    users[socket.id] = data.userId;
  });

  socket.on("disconnect", function () {
    console.log("user " + users[socket.id] + " disconnected");
    delete users[socket.id];
  });
});
