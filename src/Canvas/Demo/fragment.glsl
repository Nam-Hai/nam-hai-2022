precision mediump float;
uniform float o;
uniform float fade;

varying vec2 vUv;

void main() {
  // vec4 texture = texture2D(tMap, vUv);
  // vec3 blanc = vec3( 1.,1.,1.);
  // gl_FragColor = vec4(mix(blanc, vec3(texture), fade), o);
  // gl_FragColor = vec4(vec3(texture), o);
  gl_FragColor = vec4(1.0,1.0,1.0, o);
}
