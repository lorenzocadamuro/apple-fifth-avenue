/**
 * @author Lorenzo Cadamuro / http://lorenzocadamuro.com
 */

import Regl from 'regl'

export const regl = Regl({
  container: document.querySelector('.content'),
  attributes: {
    antialias: true,
    alpha: false,
  },
})

let tick

export const play = (action) => {
  if (!tick) {
    tick = regl.frame(action)
  }
}

export const stop = () => {
  if (tick) {
    tick.cancel()
    tick = null
  }
}
