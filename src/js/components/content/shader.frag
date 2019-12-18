precision mediump float;

uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform int u_maskId;
uniform int u_typeId;
uniform sampler2D u_displacement;
uniform sampler2D u_mask;
uniform float u_tick;

varying vec2 v_uv;

const float PI2 = 6.283185307179586;

#pragma glslify: gradients = require(../../../glsl/gradients.glsl);

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec4 displacement = texture2D(u_displacement, st);
  
  vec2 direction = vec2(cos(displacement.r * PI2), sin(displacement.r * PI2));
  float length = displacement.g;

  vec2 newUv = v_uv;

  newUv.x += (length * 0.07) * direction.x;
  newUv.y += (length * 0.07) * direction.y;

  vec4 texture = texture2D(u_texture, newUv);
  float tick = u_tick * 0.009;

  vec3 color = gradients(u_typeId, v_uv, tick);

  texture.rgb = color + (texture.rgb * color);

  vec4 mask = texture2D(u_mask, st);

  int maskId = int(mask.r * 4.0 + mask.g * 2.0 + mask.b * 1.0);

  if (maskId == u_maskId) {
    gl_FragColor = vec4(texture.rgb, texture.a * mask.a);
  } else {
    discard;
  }
}