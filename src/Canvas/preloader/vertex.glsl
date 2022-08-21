attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
uniform vec2 d;

void main() {
  gl_Position =  projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);
}
