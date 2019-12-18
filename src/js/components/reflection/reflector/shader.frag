precision mediump float;

uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_depthOpacity;

varying vec2 v_uv;
varying float v_z;

mat2 scale(vec2 scale){
  return mat2(scale.x, 0.0, 0.0, scale.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec4 texture = texture2D(u_texture, v_uv);

  texture.a -= u_depthOpacity * v_z;

  gl_FragColor = texture;
}