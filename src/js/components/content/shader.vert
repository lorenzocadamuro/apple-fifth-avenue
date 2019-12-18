precision mediump float;

attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;

varying vec2 v_uv;

void main() {
  v_uv = a_uv;

  gl_Position = u_projection * u_view * u_world * vec4(a_position, 1);
}