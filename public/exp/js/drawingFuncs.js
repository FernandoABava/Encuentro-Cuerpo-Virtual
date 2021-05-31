let simple;

function preload() {
  // simple = loadShader('shaders/empty.vert', 'shaders/simple.frag');
}

function drawBorders(){
  push()
  noFill()
  stroke(0)
  strokeWeight(3)
  rect(0, 0, width, height);
  pop()
}

function drawSimpleCircles(points) {
  push();
  stroke(180)
  // background(255)
  points.forEach((item, i) => {
    ellipse(item.position.x, item.position.y, 7)
  });
  pop();
}

function drawSpots(points, rPoints) {
  push();
  // background(255, 24);
  colorMode(HSB);
  noStroke();
  points.forEach((item, i) => {
    fill(map(i, 0, points.length, 0, 255), 245, 180)
    var t = 30 - dist(rPoints[i].position.x, rPoints[i].position.y, item.position.x, item.position.y)*.5
    t = t <= 7 ? 7 : t;
    ellipse(item.position.x, item.position.y, t)
  });
  pop();
}

function drawStick() {
  background(255)
  push()
  stroke(10);
  strokeWeight(2);
  // torso
  var finTorso = {
    x: 0,
    y: 0
  }
  if(pPoints.length >=13){
    finTorso.x = lerp(pPoints[11].position.x, pPoints[12].position.x, .5)
    finTorso.y = lerp(pPoints[11].position.y, pPoints[12].position.y, .5)
    line(pPoints[0].position.x, pPoints[0].position.y, finTorso.x, finTorso.y)
  }
  // Brazo izq
  if(pPoints.length >=10){
    line(pPoints[5].position.x, pPoints[5].position.y, pPoints[9].position.x, pPoints[9].position.y)
  }
  // Brazo der
  if(pPoints.length >=11){
    line(pPoints[6].position.x, pPoints[6].position.y, pPoints[10].position.x, pPoints[10].position.y)
  }
  // Pierna izq
  if(pPoints.length >=14){
    line(finTorso.x, finTorso.y, pPoints[13].position.x, pPoints[13].position.y)
  }
  // Pierna der
  if(pPoints.length >=15){
    line(finTorso.x, finTorso.y, pPoints[14].position.x, pPoints[14].position.y)
  }
  pop();
}

function drawShader() {
  var shaderJoints = [];

  var sJointsX = [];
  var sJointsY = [];

  for(var i = 0; i<16; i++){
    if(pPoints[i]){
      shaderJoints.push([
        pPoints[i].position.x / width,
        1. - pPoints[i].position.y / height
      ]);

      sJointsX.push(pPoints[i].position.x / width);
      sJointsY.push(1. - pPoints[i].position.y / height);
    } else {
      shaderJoints.push([.5, .5]);

      sJointsX.push(.5);
      sJointsY.push(.5);
    }
  }

  // console.log(shaderJoints);
  // console.log(shaderJoints[0]);

  simple.setUniform('resolution', [width, height]);
  simple.setUniform('time', millis()/1000.0);
  // TODAS LAS POSICIONES EN UN ARRAY
  // simple.setUniform('joints',[
  //   shaderJoints[0],
  //   shaderJoints[1],
  //   shaderJoints[2],
  //   shaderJoints[3],
  // ]);

  // NARIZ SOLA
  if(pPoints.length > 0)
  simple.setUniform('nose', shaderJoints[0]);
  else
  simple.setUniform('nose', [.5, .5]);

  // TODAS LAS POSICIONES EN DOS ARRAYS DIFERENTES
  // simple.setUniform('jointsX', sJointsX)
  // simple.setUniform('jointsY', sJointsY)

  shader(simple);
  rect(width*.5, height*.5, width, height);
  resetShader();
  // noLoop();
}

function drawStars(points) {
  push();
  stroke(90)
  // background(255)
  points.forEach((item, i) => {
    colorMode(HSB, 255, 255, 255, 255)
    fill(map(i, 0, 17, 0, 255), 245, 255)
    ellipse(item.position.x, item.position.y, 7)
    var veci = []
    points.forEach((sub, j) => {
      if(item != sub){
        if(dist(item.position.x, item.position.y, sub.position.x, sub.position.y)<65){
          line(item.position.x, item.position.y, sub.position.x, sub.position.y);
          veci.push(sub);
          if(veci.length >= 2){
            var alfa = map(dist(item.position.x, item.position.y, sub.position.x, sub.position.y), 0, 65, 0, 255);
            fill(map(i, 0, 17, 0, 255), 245, 255, alfa)
            triangle(item.position.x, item.position.y,
              veci[0].position.x, veci[0].position.y,
              veci[1].position.x, veci[1].position.y)
            }
          }
        }
      });

  });
  pop();
}

function drawBlob() {
  push()
  background(255)
  stroke(25)
  strokeWeight(2)
  fill(200, 128, 95);
  if(pPoints.length>15){
    for (var i = 0; i < 5; i++) {
      j = (i+1)%5;
      line(pPoints[i].position.x, pPoints[i].position.y, pPoints[j].position.x, pPoints[j].position.y)
    }
    beginShape();
    vertex(pPoints[5].position.x, pPoints[5].position.y); //Hombro izq

    bezierVertex(pPoints[3].position.x, pPoints[3].position.y, //Oreja izq
      pPoints[4].position.x, pPoints[4].position.y, //Oreja der
      pPoints[6].position.x, pPoints[6].position.y //Hombro der
    )

    bezierVertex(pPoints[8].position.x, pPoints[8].position.y, //Codo der
      pPoints[10].position.x, pPoints[10].position.y, //Muñeca der
      pPoints[12].position.x, pPoints[12].position.y //Cadera der
    )
    bezierVertex(pPoints[14].position.x, pPoints[14].position.y, //Rodilla der
      pPoints[13].position.x, pPoints[13].position.y, //Rodilla izq
      pPoints[11].position.x, pPoints[11].position.y //cadera izq
    )
    bezierVertex(pPoints[9].position.x, pPoints[9].position.y, //muñeca izq
      pPoints[7].position.x, pPoints[7].position.y, //Codo izq
      pPoints[5].position.x, pPoints[5].position.y //Hombro izq
    )
    endShape();
    pop()
  }
}

function drawOrganic(points) {
  push();
  // background(255);
  noStroke()
  fill(200, 6, 203);
  randomSeed(12)
  points.forEach((orig, i) => {
    var dest;
    var dis = 0;
    points.forEach((item, j) => {
      if(dest && dest != orig){
        dis = dist(orig.position.x, orig.position.y, dest.position.x, dest.position.y)
        if(dist(orig.position.x, orig.position.y, item.position.x, item.position.y) < dis){
          dest = item;
        }
      }else dest = item;
    });
    // console.log(dest);
    // noLoop();
    push()
    translate(orig.position.x, orig.position.y);
    var dx = dest.position.x -  orig.position.x;
    var dy = dest.position.y - orig.position.y;
    var dir = atan2(dy, dx);
    rotate(dir);
    for(var i = 0; i<6; i++){
      var x = dis * (i/6)
      var mod = dis/6;
      ellipse(x,random(-mod *.5, mod *.5),mod * random(.9, 2));
      ellipse(x,random(-mod *.75, mod *.75),mod * random(.15, .9));
    }
    pop()
  });
  pop();
}
