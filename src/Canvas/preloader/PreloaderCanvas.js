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
    this.buttonBoundsPixel = this.button.getBoundingClientRect()
    this.buttonBounds = {
      width: this.buttonBoundsPixel.width * this.canvasSize.width / this.canvasSizePixel.width,
      height: this.buttonBoundsPixel.height * this.canvasSize.height / this.canvasSizePixel.height
    }


    this.setScalePos()
  }

  setScalePos() {
    if (!this.mesh) return
    this.mesh.scale.x = this.buttonBounds.width
    this.mesh.scale.y = this.buttonBounds.height
    this.mesh.position.x = 0
    this.mesh.position.y = 0
  }

  async hide() {
    console.log('hide Canvas preloader');
    const initX = this.mesh.scale.x,
      initY = this.mesh.scale.y,
      targetX = this.canvasSize.width,
      targetY = this.canvasSize.height;
    console.log(targetY, targetX);
    this.program.uniforms.o.value = 1
    await new Promise(res => {
      let motion = new N.M({
        d: 1000,
        e: 'o6',
        update: t => {
          this.mesh.scale.x = N.Lerp(initX, targetX, t.progE)
          this.mesh.scale.y = N.Lerp(initY, targetY, t.progE)

          this.program.uniforms.radius.value = Math.max(this.buttonBounds.width, this.buttonBounds.height) * 4
          this.program.uniforms.force.value = N.Lerp(-2.5, 0, N.Ease.o5(t.prog))
        },
        cb: () => {
          this.program.uniforms.o.value = 0
          console.log('CB');
          res()
        },
      })
      motion.play()
    })
  }

}
