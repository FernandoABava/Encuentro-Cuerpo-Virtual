var express = require('express');
var socket = require('socket.io');

let port = process.env.PORT || 7200;

var nRooms = 0;

var orig = 'http://localhost:7200/play.html';
orig = process.env.PORT ? 'https://p-encuentro-cuerpo-virtual.herokuapp.com/play.html' : orig;


// EXPRESS -------------------------

var app = express();
var server = app.listen(port);

app.use(express.static('public'));

app.get('/room-info', (req, res)=>{ //Get request para el nro de Rooms
  res.send('#' + nRooms);
  nRooms ++;
})

// SOCKETS -------------------------
var io = socket(server, {
  cors: {
    origin: orig,
    methods: ["GET", "POST"]
  }
});
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  //nueva coneccion
  console.log(socket.id);

  //Joinear un Room || Ingresar a una Sala
  socket.on('join', data=>{
    socket.join(data.r);
    console.log(socket.id + ' se unio a ' + data.r);
  });

  socket.on('keyPoints', data=>{
    // socket.broadcast.emit('keyPoints', data); //A todos todos menos yo, socket
    socket.to(data.room).emit('keyPoints', data); //A una sala específica
  });

}

// SALUDO --------------------------
console.log('Holi, ¿cómo andan?');
