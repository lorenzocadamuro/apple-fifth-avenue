float borders(vec2 uv, float strokeWidth) {
  vec2 borderBottomLeft = smoothstep(vec2(0.0), vec2(strokeWidth), uv);

  vec2 borderTopRight = smoothstep(vec2(0.0), vec2(strokeWidth), 1.0 - uv);

  return 1.0 - borderBottomLeft.x * borderBottomLeft.y * borderTopRight.x * borderTopRight.y;
}

#pragma glslify: export(borders);