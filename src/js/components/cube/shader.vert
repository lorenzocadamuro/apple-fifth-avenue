precision mediump float;

attribute vec3 a_position;
attribute vec3 a_center;
attribute vec2 a_uv;
attribute vec3 a_color;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;

varying vec3 v_normal;
varying vec3 v_center;
varying vec3 v_point;
varying vec2 v_uv;
varying vec3 v_color;
varying float v_depth;

void main() {
  vec4 center = u_projection * u_view * u_world * vec4(a_center, 1.0);
  vec4 position = u_projection * u_view * u_world * vec4(a_position, 1.0);

  v_normal = normalize(a_position);
  v_center = center.xyz;
  v_point = position.xyz;
  v_uv = a_uv;
  v_color = a_color;
  v_depth = (mat3(u_view) * mat3(u_world) * a_position).z;

  gl_Position = position;
}