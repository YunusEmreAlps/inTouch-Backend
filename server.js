require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const http = require("http");
const server = http.createServer();
const { Server } = require("socket.io");

connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)
app.use(passport.initialize())
require('./config/passport')(passport)


let users = [];

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    const user = {
      socketId: socket.id,
      coords: data,
    };

    users.push(user);

    socket.broadcast.emit("new-user", user);
    socket.emit("current-user", user);
    socket.emit("users", users);
  });

  socket.on("position-change", (data) => {
    users = users.map((u) => {
      if (u.socketId === data.socketId) {
        return data;
      }
      return u;
    });

    io.emit("position-change", data);
    console.log(users);
  });

  socket.on("disconnect", () => {
    users = users.filter((u) => u.socketId !== socket.id);
    socket.broadcast.emit("users", users);
  });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))