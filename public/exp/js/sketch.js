let pPoints = [];

let yo = {
  raw: [],
  smooth: []
}

let vos = {
  raw: [],
  smooth: []
}

function setup() {
  // var cnv = createCanvas(640, 480, WEBGL);
  var cnv = createCanvas(640, 480);
  cnv.parent('#canvas-holder')
  pixelDensity(1);

  // SOCKET
  // socket.on('keyPoints', drawOther);
}

function draw() {
  // background(255, 24);
  background(255);

  if(pose){
    refreshPoints().then((kp)=>{
      yo.raw = kp;

      yo.smooth = smoothPoints(yo.raw, yo.smooth);

      var data = {
        room: room,
        raw: kp
      }
      socket.emit('keyPoints', data);

    });
  }

  if(yo.smooth){
    // drawSimpleCircles(yo.raw)
    // drawStick();
    // drawSpots(yo.smooth, yo.raw);
    // drawStars(yo.smooth);
    // drawBlob();
    // drawShader();
    // drawOrganic(yo.smooth);
  }
  if(vos.smooth){
    // drawSimpleCircles(yo.raw)
    // drawStick();
    // drawSpots(yo.smooth, yo.raw);
    // drawStars(vos.smooth);
    // drawBlob();
    // drawShader();
    // drawOrganic(yo.smooth);
  }

  if(yo.smooth && vos.smooth) drawStars(yo.smooth.concat(vos.smooth))

  drawBorders();
}

function drawOther(data) {
  vos.raw = data.raw;
  vos.smooth = smoothPoints(vos.raw, vos.smooth);
}

function smoothPoints(raw, smooth) {

  if(smooth.length<=0 && raw.length > 0)
    return raw;
  else
    return smooth.map((item, i) => {
      var d = dist(item.position.x, item.position.y, raw[i].position.x, raw[i].position.y)
      if(d > 6){
        var s = .15;
        item.position.x = lerp(item.position.x, raw[i].position.x, s)
        item.position.y = lerp(item.position.y, raw[i].position.y, s)
      }
      return item;
    });
}
