varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = position.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}