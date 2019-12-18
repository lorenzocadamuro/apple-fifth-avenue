precision mediump float;

attribute vec3 a_position;

uniform mat4 u_textureMatrix;
uniform mat4 u_world;

varying vec4 vUv;

void main() {
  vUv = u_textureMatrix * vec4(a_position, 1.0);

  gl_Position = u_world * vec4(a_position, 1.0);
}