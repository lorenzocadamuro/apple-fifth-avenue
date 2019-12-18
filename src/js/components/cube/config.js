export const positions = [
  [-1, +1, +1], [+1, +1, +1], [+1, -1, +1], [-1, -1, +1], // front face
  [+1, +1, +1], [+1, +1, -1], [+1, -1, -1], [+1, -1, +1], // right face
  [+1, +1, -1], [-1, +1, -1], [-1, -1, -1], [+1, -1, -1], // back face
  [-1, +1, -1], [-1, +1, +1], [-1, -1, +1], [-1, -1, -1], // left face
  [-1, +1, -1], [+1, +1, -1], [+1, +1, +1], [-1, +1, +1], // top face
  [-1, -1, -1], [+1, -1, -1], [+1, -1, +1], [-1, -1, +1], // bottom face
]

export const centers = [
  [0, 0, 1], // front face
  [1, 0, 0], // right face
  [0, 0, -1], // back face
  [-1, 0, 0], // left face
  [0, 1, 0], // top face
  [0, -1, 0], // bottom face
].map((c) => {
  return [c, c, c, c]
})

export const uv = [
  [0, 0], [1, 0], [1, 1], [0, 1], // front face
  [0, 0], [1, 0], [1, 1], [0, 1], // right face
  [0, 0], [1, 0], [1, 1], [0, 1], // back face
  [0, 0], [1, 0], [1, 1], [0, 1], // left face
  [0, 0], [1, 0], [1, 1], [0, 1], // top face
  [0, 0], [1, 0], [1, 1], [0, 1], // bottom face
]

export const elements = [
  [2, 1, 0], [2, 0, 3], // front face
  [6, 5, 4], [6, 4, 7], // right face
  [10, 9, 8], [10, 8, 11], // back face
  [14, 13, 12], [14, 12, 15], // left face
  [18, 17, 16], [18, 16, 19], // top face
  [20, 21, 22], [23, 20, 22], // bottom face
]

export const colors = [
  [0, 1, 1], // front face => mask 3
  [0, 0, 1], // right face => mask 1
  [0, 1, 0], // back face => mask 2
  [0, 1, 1], // left face => mask 3
  [1, 0, 0], // top face => mask 4
  [1, 0, 1], // bottom face => mask 5
].map((c) => {
  return [c, c, c, c]
})
