const videoWidth = 640;
const videoHeight = 480;
//Probar con Optical Flow

const server = window.location.href.split('play')[0];

let net;
let pose;

const room = window.location.href.split('=')[1];

$(document).ready(function() {
  setupCamera().then(video=>{
    video.play()
    $('#video').hide()

    loadPoseNet();
  });
  //SOCKET
  console.log(`conectandose a ${server}`);
  socket = io.connect(server); //Conecto la socket
  console.log('Sala: ' + room);
  socket.emit('join', {r: room})

  socket.on('keyPoints', drawOther);
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
