precision mediump float;
uniform sampler2D tMap;
uniform sampler2D tGridFlow;

varying vec2 vUv;

void main() {
    // vec4 texture = texture2D(tMap,vUv);
    // vec4 gridflow = texture2D(tGridFlow, vUv);
    // gl_FragColor = gridflow;
  float p = 30.;

  vec4 gridFlow = texture2D(tGridFlow, vUv);


  vec4 texture = texture2D(tMap, (vUv - vec2(gridFlow.r - gridFlow.g, gridFlow.b -gridFlow.a)/p ));
  if(texture.a < 0.1) {
    discard;
  }
  // gl_FragColor = vec4(vec3(gridFlow), 1.);
  gl_FragColor = vec4(vec3(texture), 1.);
}


