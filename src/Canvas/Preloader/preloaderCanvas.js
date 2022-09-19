import { Texture } from 'ogl'
import { N } from "../../utils/namhai";

const ASSETS = [
  'contact/contact_1.png',
  'contact/contact_2.png',
  'collections/cherifkid1.jpg',
  'collections/cherifkid2.png',
  'collections/noise1.png',
  'collections/noise2.png',
  'collections/travis1.png',
  'collections/travis2.png',
  'collections/wrath1.png',
  'collections/wrath2.png',
  'collections/Jesperish1.jpg',
  'collections/Jesperish2.jpg',
  'contact/contact_1.png',
  'contact/contact_2.png',
  'home/home1.jpg',
  'home/home2.jpg',
  'home/home3.jpg',
  'home/home4.jpg',
]

export const TEXTURE = new Map()
export default class {
  constructor({ gl, scene, canvasSize, canvasSizePixel }) {
    this.gl = gl

    this.counter = N.getAll('.main .preloader__counter span span')
    this.bar = N.get('.preloader__bar')
  }

  async loadTexture(cb) {
    this.index = 0
    for (const assets of ASSETS) {

      const texture = new Texture(this.gl)
      const image = new window.Image()
      image.crossOrigin = 'anonymous'
      image.src = assets
      await new Promise(s => {
        image.onload = () => {
          texture.image = image
          this.onLoadedTexture(assets, texture, cb)
          s()
        }
      })
    }
  }

  onLoadedTexture(src, texture, cb) {
    TEXTURE.set(src, texture)
    this.index++
    const count = this.index / ASSETS.length,
      r = N.Round(count * 100, 0),
      t = N.ZL(r === 100 ? 0 : r)
    this.counter[0].innerText = t[0]
    this.counter[1].innerText = t[1]
    this.bar.style.transform = `scaleX(${(2 + count) * 100}%)`
    if (this.index / ASSETS.length == 1) {
      this.onComplete(cb)
    }
  }

  onComplete(cb) {
    new N.M({
      el: [...this.counter],
      p: {
        x: [0, 103]
      },
      d: 600,
      e: 'o5',
      delay: 300,
      cb: _ => {
        cb()
      }
    }).play()
  }
}
