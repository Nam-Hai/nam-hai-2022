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

    let motionInit = new N.TL()
    this.nextTL = new N.TL()
    this.init = false

    motionInit.from({
      d: 2000,
      update: t => {
        this.program.uniforms.u_time.value = t.progE
      },
      cb: _ => {
        this.program.uniforms.u_init.value = true;
        this.program.uniforms.u_time.value = 0;
        this.program.uniforms.u_force.value = 0;
        this.program.uniforms.u_ftime.value = 0;
        this.init = true
      }
    })
    motionInit.from({
      d: 1000,
      delay: 1000,
      ease: 'linear',
      update: t => {
        this.program.uniforms.u_force.value = t.progE
      }
    })
    motionInit.play()
    N.BM(this, ['update'])

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
        u_ftime: {
          value: 0
        },
        u_force: {
          value: 0
        },
        u_maxDim: {
          value: 1
        },
        u_init: {
          value: false
        },
        u_rand: {
          value: 0
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

  }

  destroy() {
    this.raf.stop()
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

