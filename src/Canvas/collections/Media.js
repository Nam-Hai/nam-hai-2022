import { Transform, Plane, Program, Mesh, Texture } from 'ogl'
import { N } from '../../utils/namhai'
import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

export default class {
  constructor({ el, gl, geometry, scene, canvasSize, canvasSizePixel }) {
    this.gl = gl
    this.el = el
    this.geometry = geometry
    this.scene = scene
    this.canvasSize = canvasSize
    this.canvasSizePixel = canvasSizePixel

    this.createTexture()
    this.createProgram()
    this.mesh = new Mesh(this.gl, {
      geometry,
      program: this.program
    })

    this.getBounds()
    this.mesh.setParent(scene)


  }

  createTexture() {
    this.texture = new Texture(this.gl)
    this.image = new window.Image()
    this.image.crossOrigin = 'anonymous'
    this.image.src = N.Ga(this.el, 'data-src')
    this.image.onload = () => this.texture.image = this.image
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: {
          value: this.texture
        }
      }
    })
  }

  getBounds() {
    this.boundsPixel = this.el.getBoundingClientRect()
    console.log(this.boundsPixel);
    this.bounds = {
      width: this.boundsPixel.width * this.canvasSize.width / this.canvasSizePixel.width,
      height: this.boundsPixel.height * this.canvasSize.height / this.canvasSizePixel.height
    }

    this.setScale()
  }
  setScale() {
    this.mesh.scale.x = this.bounds.width
    this.mesh.scale.y = this.bounds.height

    this.mesh.position.x = (this.boundsPixel.x - this.canvasSizePixel.width / 2) * this.canvasSize.width / this.canvasSizePixel.width + this.bounds.width / 2
    this.mesh.position.y = (-this.boundsPixel.y + this.canvasSizePixel.height / 2) * this.canvasSize.height / this.canvasSizePixel.height - this.bounds.height / 2
  }
}
