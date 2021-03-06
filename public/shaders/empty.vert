attribute vec3 aPosition;
#define PI  3.14159265359
void main() {

  vec4 positionVec4 = vec4(aPosition, 1.0);

  // scale the rect by two, and move it to the center of the screen
  // if we don't do this, it will appear with its bottom left corner in the center of the sketch
  // try commenting this line out to see what happens
  positionVec4.xy = positionVec4.xy*2. -1.;
  // positionVec4.xy = positionVec4.xy -.5;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
