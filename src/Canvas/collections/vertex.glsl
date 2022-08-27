precision highp float;

attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform vec2 s;
uniform vec2 t;
varying vec2 vUv;

void main() {

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);


  vUv = (uv - .5)/s+ .5 + t;
}

