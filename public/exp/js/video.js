async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  // if(navigator.mediaDevices){
  //   console.log('MediaDevices OK');
  // }else if (navigator.getUserMedia) {
  //   console.log('getUserMedia OK');
  // }else if (navigator.webkitGetUserMedia) {
  //   console.log('webkit OK');
  // }else if (navigator.mozGetUserMedia) {
  //   console.log('moz OK');
  // }else {
  //   console.log('Nada ni nadie');
  // }

  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      // facingMode: 'user',
      width: videoWidth,
      height: videoHeight,
    },
  });

// Para implementar otros navegadores más viejos :(
//   .catch((err)=>{
//     navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
//
//     navigator.getMedia({
//       'audio': false,
//       'video': true
//     }, (localMediaStream)=>{
//       video.srcObject = localMediaStream
//       stream = localMediaStream;
//     })
//   }
// );

  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}
