#define PI 3.1415
precision mediump float;

attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_ftime;

varying vec2 vUv;

void main() {
  vUv = uv;

  float newZ = -(cos(position.x *  PI) / 2.0+ cos(position.y  * PI)/ 2.0)*u_ftime * 1.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, newZ, 1.0);
}

