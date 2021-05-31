const videoWidth = 640;
const videoHeight = 480;
//Probar con Optical Flow

const server = window.location.href.split('?')[0];

let net;
let pose;
let rawPoints;

const room = window.location.href.split('=')[1];

$(document).ready(function() {
  setupCamera().then(video=>{
    video.play()
    $('#video').hide()

    loadPoseNet();
  });
  //SOCKET
  socket = io.connect(server); //Conecto la socket
  console.log('Sala: ' + room);
  socket.emit('join', {r: room})
});

async function loadPoseNet() {
  console.log('Holi');
  net = await posenet.load();
  pose = await net.estimateSinglePose(video, {
    flipHorizontal: true
  });
  // puntos = pose.keypoints;
  // console.log(puntos);
}

async function refreshPoints() {
  pose = await net.estimateSinglePose(video, {
    flipHorizontal: true
  });
  return pose.keypoints
}
