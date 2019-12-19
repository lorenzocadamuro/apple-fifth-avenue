precision mediump float;

uniform vec2 u_resolution;
uniform int u_face;
uniform int u_typeId;
uniform sampler2D u_texture;
uniform samplerCube u_reflection;
uniform float u_tick;
uniform float u_borderWidth;
uniform float u_displacementLength;
uniform float u_reflectionOpacity;
uniform int u_scene;

varying vec3 v_normal;
varying vec3 v_center;
varying vec3 v_point;
varying vec2 v_uv;
varying vec3 v_color;
varying float v_depth;

const float PI2 = 6.283185307179586;

#pragma glslify: borders = require(../../../glsl/borders.glsl);
#pragma glslify: radialRainbow = require(../../../glsl/radial-rainbow.glsl);

mat2 scale(vec2 value){
  return mat2(value.x, 0.0, 0.0, value.y);
}

mat2 rotate2d(float value){
  return mat2(cos(value), -sin(value), sin(value), cos(value));
}

vec2 rotateUV(vec2 uv, float rotation) {
  float mid = 0.5;
  return vec2(
    cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
    cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
  );
}

vec4 type1() {
  vec2 toCenter = v_center.xy - v_point.xy;
  float angle = (atan(toCenter.y, toCenter.x) / PI2) + 0.5;
  float displacement = borders(v_uv, u_displacementLength) + borders(v_uv, u_displacementLength * 2.143) * 0.3;

  return vec4(angle, displacement, 0.0, 1.0);
}

vec4 type2() {
  return vec4(v_color, 1.0);
}

vec4 type3() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec4 strokeColor = radialRainbow(st, u_tick);
  float depth = clamp(smoothstep(-1.0, 1.0, v_depth), 0.6, 0.9);
  vec4 stroke = strokeColor * vec4(borders(v_uv, u_borderWidth)) * depth;

  vec4 texture;

  if (u_face == -1) {
    vec3 normal = normalize(v_normal);
    texture = textureCube(u_reflection, normalize(v_normal));

    texture.a *= u_reflectionOpacity * depth;
  }  else {
    texture = texture2D(u_texture, st);
  }

  if (stroke.a > 0.0) {
    return stroke - texture.a;
  } else {
    return texture;
  }
}

vec4 switchScene(int id) {
  if (id == 1) {
    return type1();
  } else if (id == 2) {
    return type2();
  } else if (id == 3) {
    return type3();
  }
}

void main() {
  if (u_scene == 3) {
    gl_FragColor = switchScene(u_typeId);
  } else {
    gl_FragColor = switchScene(u_scene);
  }
}