float io2(float t) {
    float p = 2.0 * t * t;
    return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
}

attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float force;
uniform float radius;
uniform vec2 s;

attribute vec2 uv;
varying vec2 vUv;
void main() {
  float x = position.x;
  float y = position.y;
  float d = sqrt(x*x + y*y);

  float z = (force - io2(d/radius) * force) * step(d, radius);
  gl_Position =  projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
  vUv = (uv - .5)/s+ .5;
}
