precision mediump float;

uniform vec2 u_resolution;
uniform int u_face;
uniform int u_typeId;
uniform sampler2D u_texture;
uniform samplerCube u_reflection;
uniform float u_tick;
uniform float u_reflectionOpacity;

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
  float displacement = borders(v_uv, 0.028) + borders(v_uv, 0.06) * 0.3;

  return vec4(angle, displacement, 0.0, 1.0);
}

vec4 type2() {
  return vec4(v_color, 1.0);
}

vec4 type3() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec4 strokeColor = radialRainbow(st, u_tick);
  float depth = clamp(smoothstep(-1.0, 1.0, v_depth), 0.6, 0.9);
  vec4 stroke = strokeColor * vec4(borders(v_uv, 0.011)) * depth;

  vec4 final;

  if (u_face == -1) {
    vec3 normal = normalize(v_normal);
    vec4 texture = textureCube(u_reflection, normal);

    texture.a *= u_reflectionOpacity * depth;

    if (stroke.a > 0.0) {
      final = stroke;
    } else {
      final = texture;
    }
  }  else {
    vec4 texture = texture2D(u_texture, st);
    
    final = texture + stroke;
  }

  return final;
}

void main() {
  if (u_typeId == 1) {
    gl_FragColor = type1();
  } else if (u_typeId == 2) {
    gl_FragColor = type2();
  } else if (u_typeId == 3) {
    gl_FragColor = type3();
  } else {
    discard;
  }
}