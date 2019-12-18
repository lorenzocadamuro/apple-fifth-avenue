/**
 * @author Lorenzo Cadamuro / http://lorenzocadamuro.com
 */

import {mat4} from 'gl-matrix'
import {regl} from '~js/renderer'
import gui from '~js/helpers/gui'
import {positions, centers, uv, elements, colors} from './config'
import frag from './shader.frag'
import vert from './shader.vert'

const emptyTexture = regl.texture()
const emptyCube = regl.cube()

const CONFIG = {
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  rotation: 0,
  rotateX: 1,
  rotateY: 1,
  rotateZ: 1,
  scale: 1,
  reflectionOpacity: 0.3
}

gui.get((gui) => {
  const folder = gui.addFolder('Cube')

  folder.add(CONFIG, 'translateX', -30, 30).step(0.01)
  folder.add(CONFIG, 'translateY', -30, 30).step(0.01)
  folder.add(CONFIG, 'translateZ', -30, 30).step(0.01)
  folder.add(CONFIG, 'rotation', -5, 5).step(0.0001)
  folder.add(CONFIG, 'rotateX', 0, 10).step(0.1)
  folder.add(CONFIG, 'rotateY', 0, 10).step(0.1)
  folder.add(CONFIG, 'rotateZ', 0, 10).step(0.1)
  folder.add(CONFIG, 'scale', 0, 10).step(0.01)
  folder.add(CONFIG, 'reflectionOpacity', 0, 1).step(0.01)
})

export default regl({
  frag,
  vert,
  context: {
    world: (context, {matrix}) => {
      const {translateX, translateY, translateZ, rotation, rotateX, rotateY, rotateZ, scale} = CONFIG

      const world = mat4.create()

      mat4.translate(world, world, [translateX, translateY, translateZ])
      mat4.rotate(world, world, rotation, [rotateX, rotateY, rotateZ])
      mat4.scale(world, world, [scale, scale, scale])

      if (matrix) {
        mat4.multiply(world, world, matrix)
      }

      return world
    },
    face: (context, {cullFace}) => {
      return cullFace === Faces.FRONT ? -1 : 1
    },
    texture: (context, {texture}) => {
      return texture || emptyTexture
    },
    reflection: (context, {reflection}) => {
      return reflection || emptyCube
    },
    textureMatrix: (context, {textureMatrix}) => {
      return textureMatrix
    },
    reflectionOpacity: () => {
      const {reflectionOpacity} = CONFIG

      return reflectionOpacity
    }
  },
  attributes: {
    a_position: positions,
    a_center: centers,
    a_uv: uv,
    a_color: colors,
  },
  uniforms: {
    u_world: regl.context('world'),
    u_face: regl.context('face'),
    u_typeId: regl.prop('typeId'),
    u_texture: regl.context('texture'),
    u_reflection: regl.context('reflection'),
    u_tick: regl.context('tick'),
    u_reflectionOpacity: regl.context('reflectionOpacity'),
  },
  cull: {
    enable: true,
    face: regl.prop('cullFace'),
  },
  depth: {
    enable: true,
    mask: false,
    func: 'less',
  },
  blend: {
    enable: true,
    func: {
      srcRGB: 'src alpha',
      srcAlpha: 1,
      dstRGB: 'one minus src alpha',
      dstAlpha: 1,
    },
    equation: {
      rgb: 'add',
      alpha: 'add',
    },
    color: [0, 0, 0, 0],
  },
  elements,
  count: 36,
  framebuffer: regl.prop('fbo'),
})

export const Types = {
  DISPLACEMENT: 1,
  MASK: 2,
  FINAL: 3,
}

export const Faces = {
  BACK: 'back',
  FRONT: 'front',
}

export const Masks = {
  M1: 1,
  M2: 2,
  M3: 3,
  M4: 4,
  M5: 5,
}
