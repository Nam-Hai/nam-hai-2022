#define PI 3.1415926535
attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 newPos = modelViewMatrix*   vec4(position, 1.0);
  gl_Position = projectionMatrix * newPos;
}
