const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mysql = require("mysql");

// our localhost port
const port = 2222;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

let mySQL_status = false;

//MySql Database connection
//LEARM : MYSQL CHEAT SHEET : http://www.newthinktank.com/2014/08/mysql-video-tutorial/
var db = mysql.createConnection({
  host: "localhost",
  user: "mysqladmin",
  password: "admin",
  database: "chat_app"
});

db.connect(err => {
  if (err) throw err;

  console.log("MySQL Connected!");
  mySQL_status = true;
});

//What to do when the socket is connected to a client
io.on("connection", socket => {
  if (mySQL_status) {
    //TODO: 1 - This sends all uses all conversations whenever anybody connectiosn
    //TODO: 2 - io.clients[] Is what i should learn and use apparently

    // Do this when the a user connects
    socket.on("user_connect", user =>
      db.query(`SELECT * FROM conversations`, (err, result, fields) => {
        if (err) throw err;
        io.sockets.emit("conversations", result);
      })
    );
    // When new Message => Send Message back out!
    socket.on("new_msg", msg => {
      //Insert message into messages
      db.query(
        `INSERT INTO messages VALUES(NULL, 1, NOW(), '${msg}', 1)`,
        (err, result, fields) => {
          if (err) throw err;
        }
      );

      io.sockets.emit("new_msg", msg);
    });
  }

  // When user disconnects => log disconnect
  socket.on("user_disconnect", user =>
    console.log(`User: ${user} disconnected.`)
  );
});

server.listen(port, () => console.log(`Listening on port ${port}`));
