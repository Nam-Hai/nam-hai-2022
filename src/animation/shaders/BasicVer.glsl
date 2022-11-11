#define PI 3.1415926535
attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
uniform float f;

void main() {
  vUv = uv;

  vec4 newPos = modelViewMatrix*   vec4(position, 1.0);
  vec4 projectedPos = projectionMatrix * newPos;

  newPos.z += (sin((newPos.x + newPos.y) * PI) * .5 + 1. ) * f * 3.;
  newPos.x -= (sin((newPos.x + newPos.y) * PI) * .5 + 1. ) * f * 0.3;
  gl_Position =projectionMatrix * newPos;
}


