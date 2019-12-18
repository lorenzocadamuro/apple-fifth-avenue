precision mediump float;

uniform sampler2D u_texture;

varying vec4 vUv;

void main() {
  gl_FragColor = texture2DProj(u_texture, vUv);
}