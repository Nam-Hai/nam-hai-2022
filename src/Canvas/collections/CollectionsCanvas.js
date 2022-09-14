import { N } from "../../utils/namhai"
import { Transform, Plane } from 'ogl'
import Media from "./Media"

export default class {
  constructor({ gl, scene, canvasSize, canvasSizePixel }) {
    this.gl = gl
    this.scene = scene
    this.canvasSize = canvasSize
    this.canvasSizePixel = canvasSizePixel

    this.group = new Transform()

    this.collectionsImg = N.getAll('.display__container img')
    this.geometry = new Plane(this.gl, {
      heightSegments: 20,
      widthSegments: 80
    })

    this.medias = Object.entries(this.collectionsImg).map(([index, el]) => {
      return new Media({ el, gl, scene: this.group, canvasSize, canvasSizePixel, geometry: this.geometry, index })
    })

    this.mediasBuffer = Object.entries(this.collectionsImg).map(([index, el]) => {
      return new Media({ el, gl, scene: this.group, canvasSize, canvasSizePixel, geometry: this.geometry })
    })


    this.group.setParent(this.scene)
  }

  onResize(canvasSizePixel, canvasSize) {
    this.canvasSizePixel = canvasSizePixel
    this.canvasSize = canvasSize

  }
  getBounds() {
    [...this.medias, ...this.mediasBuffer].forEach(m => {
      m.getBounds()
    })
  }

  destroy() {
    this.medias.forEach(m => {
      m.scene.removeChild(m.mesh)
      m = null
    })
    this.scene.removeChild(this.group)
  }

  hide() {
    this.destroy()
  }
}
