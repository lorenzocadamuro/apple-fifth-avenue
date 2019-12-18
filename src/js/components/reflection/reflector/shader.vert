precision mediump float;

attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;
uniform vec2 u_viewport;

varying vec2 v_uv;
varying float v_z;

void main() {
  v_uv = a_uv;
  v_z = 1.0 - (mat3(u_view) * mat3(u_world) * a_position).z;

  gl_Position = u_projection * u_view * u_world * vec4(a_position, 1);
}