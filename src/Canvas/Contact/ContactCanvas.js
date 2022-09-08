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

    // motionInit.from({
    //   d: 1000,
    //   ease: 'o6',
    //   update: (t) => {
    //     this.program.uniforms.u_ftime.value = t.progE
    //   }
    // })
    motionInit.from({
      d: 900,
      e: 'o3',
      update: (t) => {
        this.program.uniforms.u_ftime.value = t.progE
      }
    })
    motionInit.from({
      d: 400,
      e: 'i5',
      update: (t) => {
        this.program.uniforms.u_ftime.value = 1 - t.progE
      },
      delay: 900
    })
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

  async contactPelrinAnimation() {
    console.log('yoo');
    const r = N.Rand.range(0, 20, 0.01)
    await new Promise(s => {
      this.nextTL.pause()
      this.program.uniforms.u_time.value = 0;
      this.program.uniforms.u_force.value = 0;
      this.nextTL = new N.TL
      this.nextTL.from({
        d: 900,
        e: 'o3',
        update: (t) => {
          this.program.uniforms.u_ftime.value = t.progE
        }
      })
      this.nextTL.from({
        d: 400,
        e: 'i5',
        update: (t) => {
          this.program.uniforms.u_ftime.value = 1 - t.progE
        },
        delay: 900
      })

      this.nextTL.from({
        d: 2000,
        update: t => {
          this.program.uniforms.u_rand.value = r
          this.program.uniforms.u_time.value = t.progE
        },
        cb: _ => {
          this.program.uniforms.u_time.value = 0;
          this.program.uniforms.u_force.value = 0;
          // this.texture = this.textureBuffer
          [this.texture, this.textureBuffer] = [this.textureBuffer, this.texture]
          this.program.uniforms.tMap.value = this.texture;
          this.program.uniforms.tMapBuffer.value = this.textureBuffer;
          s()
        }
      })
      this.nextTL.from({
        d: 1000,
        delay: 1000,
        e: 'linear',
        update: t => {
          this.program.uniforms.u_force.value = t.progE
        }
      })
      this.nextTL.play()
    })
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
      heightSegments: 40,
      widthSegments: 40
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

