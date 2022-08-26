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
    this.hero = N.get('.hero img')

    this.createMesh()
    this.getBounds()
    this.group.setParent(this.scene)
  }

  createTexture() {
    this.texture = new Texture(this.gl)

    this.image = new window.Image();
    this.image.crossOrigin = 'anonymous'
    this.image.src = this.hero.getAttribute('data-src')
    this.image.onload = () => {
      this.texture.image = this.image
    }

  }

  createMesh() {
    this.createTexture()
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        tMap: {
          value: this.texture
        },
      }
    })

    this.geometry = new Plane(this.gl, {
      heightSegments: 1,
      widthSegments: 1
    })

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })
    this.mesh.setParent(this.group)
  }

  getBounds() {
    this.heroBoundsPixel = this.hero.getBoundingClientRect()
    console.log(this.heroBoundsPixel);
    this.heroBounds = {
      width: this.heroBoundsPixel.width * this.canvasSize.width / this.canvasSizePixel.width,
      height: this.heroBoundsPixel.height * this.canvasSize.height / this.canvasSizePixel.height
    }
    this.setScalePos()
  }

  setScalePos() {
    if (!this.mesh) return

    this.mesh.scale.x = this.heroBounds.width
    this.mesh.scale.y = this.heroBounds.height
    console.log('bounds', this.heroBounds);
    this.mesh.position.x = 0
    this.mesh.position.y = 0
  }

  destroy() {
    console.log(this.group, 'this.gropup');
    this.group.removeChild(this.mesh)
    this.mesh = null;
    this.scene.removeChild(this.group)
  }

  async hide() {
    // this.program.uniforms.o.value = 1
    await new Promise(res => {
      let motion = new N.M({
        d: 300,
        e: 'o6',
        update: t => {
        },
        cb: () => {
          this.destroy()
          // this.program.uniforms.o.value = 0
          res()
        },
      })
      motion.play()
    })
  }

}
