import { N } from "../../utils/namhai"
import { Transform, Plane, Program, Mesh } from 'ogl'
import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

export default class {
  constructor({ gl, scene, canvasSize, canvasSizePixel }) {
    this.gl = gl
    this.scene = scene
    this.canvasSize = canvasSize
    this.canvasSizePixel = canvasSizePixel

    this.group = new Transform()

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
        force: {
          value: 0
        },
        radius: {
          value: 2
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
    this.setScalePos()
  }

  setScalePos() {
    if (!this.mesh) return

    this.mesh.position.x = 0
    this.mesh.position.y = 0
  }

  async hide() {
    console.log('hide Canvas preloader');
    this.program.uniforms.o.value = 1
    await new Promise(res => {
      let motion = new N.M({
        d: 1000,
        e: 'o6',
        update: t => {
        },
        cb: () => {
          this.program.uniforms.o.value = 0
          res()
        },
      })
      motion.play()
    })
  }

}
