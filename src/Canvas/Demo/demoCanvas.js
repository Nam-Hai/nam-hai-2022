import { N } from "../../utils/namhai"
import { Transform, Plane, Program, Mesh, Texture } from 'ogl'
import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

export default class {
  constructor({ gl, scene, canvasSize, canvasSizePixel }) {
    this.gl = gl
    this.scene = scene
    this.canvasSize = canvasSize
    this.canvasSizePixel = canvasSizePixel

    this.group = new Transform()

    this.button = N.get('ressort-button')

    this.createMesh()
    this.getBounds()

    this.group.setParent(scene)
  }

  createMesh() {
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        o: {
          value: 0
        },
        fade: {
          value: 0
        },
        force: {
          value: 0
        },
        radius: {
          value: 2
        },
        s: {
          value: [1, 1]
        }
      }
    })

    this.geometry = new Plane(this.gl, {
      heightSegments: 80,
      widthSegments: 80
    })

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })
    this.mesh.setParent(this.group)
  }

  getBounds() {
    this.buttonBoundsPixel = this.button.getBoundingClientRect()
    this.buttonBounds = {
      width: this.buttonBoundsPixel.width * this.canvasSize.width / this.canvasSizePixel.width,
      height: this.buttonBoundsPixel.height * this.canvasSize.height / this.canvasSizePixel.height
    }


    this.setScalePos()
  }

  setScalePos() {

    this.program.uniforms.s.value = [1.93814 * this.canvasSize.height / this.canvasSize.width, 1]
    this.mesh.scale.x = this.buttonBounds.width
    this.mesh.scale.y = this.buttonBounds.height
    this.mesh.position.x = 0
    this.mesh.position.y = 0
  }

  async hide() {
    this.group.removeChild(this.mesh)
    this.scene.removeChild(this.group)
  }

}
