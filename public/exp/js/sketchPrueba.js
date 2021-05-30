var socket;

function setup() {
  // var cnv = createCanvas(640, 480, WEBGL);
  var cnv = createCanvas(640, 480);
  cnv.parent('#canvas-holder')
  pixelDensity(1);

  socket = io.connect('http://192.168.0.14:7200'); //Conecto la socket
  socket.on('mouse', drawOther);
  background(255, 17, 218);
}

function drawOther(data) {
  noStroke();
  fill(0, 100, 255);
  ellipse(data.x, data.y, 50)
}

function mouseDragged() {

  noStroke();
  fill(255, 100, 0);
  ellipse(mouseX, mouseY, 50)

  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data); // envio info

  console.log('Enviando ' + mouseX + ', ' + mouseY);
}

function draw() {
}
