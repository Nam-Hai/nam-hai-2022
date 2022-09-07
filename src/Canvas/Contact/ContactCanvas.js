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
    this.hero = N.get('.contact__container img')

    this.createMesh()
    this.getBounds()
    this.group.setParent(this.scene)

    N.BM(this, ['update'])

    this.time = 0
    this.force = 0

    this.raf = new N.RafR(this.update)
    this.raf.run()
  }

  createTexture() {
    this.texture = new Texture(this.gl)

    this.image = new window.Image();
    this.image.crossOrigin = 'anonymous'
    this.image.src = this.hero.getAttribute('data-src')
    this.image.onload = () => {
      this.texture.image = this.image
    }

    this.textureBuffer = new Texture(this.gl)

    this.imageBuffer = new window.Image()
    this.imageBuffer.crossOrigin = 'anonymous'
    this.imageBuffer.src = 'contact/contact_2.png'
    this.imageBuffer.onload = _ => {
      this.textureBuffer.image = this.imageBuffer
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
        tMapBuffer: {
          value: this.textureBuffer
        },
        ratio: {
          value: 1
        },
        u_time: {
          value: 0
        },
        u_force: {
          value: 0
        },
        u_maxDim: {
          value: 1
        }
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
    this.heroBounds = {
      width: this.heroBoundsPixel.width * this.canvasSize.width / this.canvasSizePixel.width,
      height: this.heroBoundsPixel.height * this.canvasSize.height / this.canvasSizePixel.height
    }

    this.program.uniforms.ratio.value = this.heroBounds.height / this.heroBounds.width
    this.program.uniforms.u_maxDim.value = this.heroBounds.height;
    this.setScalePos()
  }

  setScalePos() {
    if (!this.mesh) return

    this.mesh.scale.x = this.heroBounds.width
    this.mesh.scale.y = this.heroBounds.height
    this.mesh.position.x = 0
    this.mesh.position.y = 0
  }

  update() {

    this.time += 0.01
    if (this.time > 1) {
      this.time = 1
      this.force += 0.01
      if (this.force > 1) this.force = 1
    }
    this.program.uniforms.u_time.value = this.time
    this.program.uniforms.u_force.value = this.force
  }

  destroy() {
    this.group.removeChild(this.mesh)
    this.mesh = null;
    this.scene.removeChild(this.group)
  }

  async hide() {
    // this.program.uniforms.o.value = 1
    // await new Promise(res => {
    //   let motion = new N.M({
    //     d: 300,
    //     e: 'o6',
    //     update: t => {
    //     },
    //     cb: () => {
    //       this.destroy()
    //       // this.program.uniforms.o.value = 0
    //       res()
    //     },
    //   })
    //   motion.play()
    // })
    this.destroy()
  }

}

