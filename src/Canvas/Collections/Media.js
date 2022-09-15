import { Transform, Plane, Program, Mesh, Texture } from 'ogl'
import { collectionsService } from '../../animation/collectionsAnimationService'
import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

export default class {
  constructor({ el, gl, geometry, scene, canvasSize, canvasSizePixel, index }) {
    this.index = index
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
    if (this.index) {
      collectionsService.getBufferImg(this, this.index)
    }
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: {
          value: this.texture
        },
        target: {
          value: 5
        },
        force: {
          value: .5
        },
        radius: {
          value: 2
        },
        angle: {
          value: 0.3
        },
        s: {
          value: [1, 1]
        },
        t: {
          value: [0, 0]
        }
      }
    })
  }
  onResize(canvasSize, canvasSizePixel) {
    this.canvasSize = canvasSize
    this.canvasSizePixel = canvasSizePixel
  }

  getBounds() {
    this.boundsPixel = this.el.getBoundingClientRect()
    this.bounds = {
      width: this.boundsPixel.width * this.canvasSize.width / this.canvasSizePixel.width,
      height: this.boundsPixel.height * this.canvasSize.height / this.canvasSizePixel.height
    }

    this.setScale()
  }
  setScale() {
    this.program.uniforms.s.value = [this.bounds.height / this.bounds.width, 1]
    this.program.uniforms.t.value = [0, 0]

    this.mesh.scale.x = this.bounds.width
    this.mesh.scale.y = this.bounds.height

    this.mesh.position.x = (this.boundsPixel.x - this.canvasSizePixel.width / 2) * this.canvasSize.width / this.canvasSizePixel.width + this.bounds.width / 2
    this.mesh.position.y = (-this.boundsPixel.y + this.canvasSizePixel.height / 2) * this.canvasSize.height / this.canvasSizePixel.height - this.bounds.height / 2
  }


}
