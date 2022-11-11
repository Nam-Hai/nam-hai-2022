precision highp float;
varying vec2 vUv;
uniform float x;
uniform float y;
uniform vec2 resolution;
uniform sampler2D tMap;
uniform vec2 uVelo;

void main() {
  vec4 oldTexture = texture2D(tMap, vUv) * 0.88;
  float tileWidth = 30.;
  vec2 gridWidth = vec2(resolution.x / tileWidth, resolution.y / tileWidth);

  float largeur = 6.;

  vec2 newO = vec2(ceil(x*gridWidth.x), ceil(y * gridWidth.y))/ largeur;
  vec2 newP = vec2(ceil(vUv.xy * gridWidth.xy))/largeur;

  vec2 D = vec2(newO.x - newP.x, newO.y - newP.y);
  float d = sqrt(D.x * D.x );

  float f = clamp((1. - abs(d)), 0. , 1.);
  // f= pow(f, .8);

  // vec3 color = vec3(f * abs(uVelo.x),0.,  f * abs(uVelo.y));
  // gl_FragColor = vec4(vec3(oldTexture) + color * length(uVelo) , 1.);


  // vec3 color = vec3(f * abs(uVelo.x),0.,  f * abs(uVelo.y));
  // vec3 color = vec3(f * max(uVelo.x, 0.),f* max(-uVelo.x,0.),  f * max(uVelo.y, 0.));
  // gl_FragColor = vec4(vec3(oldTexture) + color * length(uVelo) , 1.);

  vec4 color = vec4(f * max(uVelo.x, 0.),f* max(-uVelo.x,0.), 0.,0.);
  gl_FragColor = vec4(oldTexture +0.75*  color * length(uVelo) );
}



