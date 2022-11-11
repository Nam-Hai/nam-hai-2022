precision mediump float;
uniform sampler2D tMap;
varying vec2 vUv;
uniform vec2 resolution;

void main() {
    vec4 texture = texture2D(tMap,vUv );

    gl_FragColor = texture;
}


