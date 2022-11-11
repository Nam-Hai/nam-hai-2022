#define PI 3.1415926535
attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform sampler2D tDist;
varying vec2 vUv;
uniform float f;

void main() {
  vUv = uv;

  vec4 newPos = modelViewMatrix*   vec4(position, 1.0);
  vec4 dist = texture2D(tDist, vec2(newPos.x + 1., -newPos.y +1.) );
  newPos.z += dist.r * f * 4.5;
  gl_Position =projectionMatrix * newPos;
}


