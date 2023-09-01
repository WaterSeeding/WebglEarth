varying vec3 vNormal;
varying vec2 vUv;
uniform float time;
uniform sampler2D textureA;

#define TEXEL_SIZE 1.0 / 512.0

vec3 tex(vec2 uv);
#pragma glslify: blur = require('glsl-hash-blur', sample=tex, iterations=20)
#pragma glslify: halftone = require('glsl-halftone')
#pragma glslify: checker = require('glsl-checker')

vec3 tex(vec2 uv) {
  return texture2D(textureA, uv).rgb;
}

void main( void ) {
  //the checker box
  vec3 colorA = vNormal * 0.5 + 0.5;
  colorA += vec3(checker(vUv, 15.0)) * 0.05;

  //our texture with halftone + hash blur
  float dist = length(vUv - 0.5);
  float falloff = smoothstep(0.3, 0.7, dist);
  float radius = TEXEL_SIZE * 40.0;
  radius *= falloff;
  vec3 colorB = blur(vUv, radius, 1.0);
  falloff = smoothstep(0.5, 0.0, dist);
  colorB = mix(colorB, halftone(colorB, vUv, 35.0), falloff);

  //mix the two
  float blend = smoothstep(0.0, 0.7, vNormal.z);
  gl_FragColor.rgb = mix(colorA, colorB, blend);
  gl_FragColor.a = 1.0;
}