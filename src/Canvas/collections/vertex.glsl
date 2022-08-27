precision highp float;

float io2(float t) {
    float p = 2.0 * t * t;
    return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
}

attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float target;
uniform float force;
uniform float radius;

uniform vec2 s;
uniform vec2 t;

varying vec2 vUv;

void main() {

  vec4 canvasPos = modelViewMatrix * vec4(position, 1.0);
  float l = abs(canvasPos.x - .3 * canvasPos.y   - target);
  canvasPos.z -= (force - io2(l/radius) * force) * step(l,radius);
  gl_Position = projectionMatrix  * canvasPos;


  vUv = (uv - .5)/s+ .5 + t;
}

