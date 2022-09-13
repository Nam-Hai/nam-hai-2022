precision mediump float;
uniform float o;
uniform sampler2D tMap;
uniform float fade;

varying vec2 vUv;

void main() {
  vec4 texture = texture2D(tMap, vUv);
  vec4 blanc = vec4( 1.,1.,1., o);
  gl_FragColor = mix(blanc, texture, fade);
  // gl_FragColor = vec4(vec3(texture), o);
  // gl_FragColor = vec4(1.0,1.0,1.0, o);
}
