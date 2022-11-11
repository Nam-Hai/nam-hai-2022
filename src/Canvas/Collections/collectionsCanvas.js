import { N } from "../../utils/namhai"
import { Transform, Plane, RenderTarget, Vec2, Program, Mesh, Texture } from 'ogl'
import Media from "./Media"
import BasicVer from './BasicVer.glsl?raw'
import BufferFrag from './BufferFrag.glsl?raw'
import LastFrag from './LastFrag.glsl?raw'
import { Clock } from "../../classes/Timer"

export default class {
  constructor({ gl, scene, canvasSize, canvasSizePixel, canvas }) {
    this.gl = gl
    this.scene = scene
    this.canvasSize = canvasSize
    this.canvasSizePixel = canvasSizePixel

    this.group = new Transform()
    this.mousemoveON = true

    this.collectionsImg = N.getAll('.display__container img')
    this.geometry = new Plane(this.gl, {
      heightSegments: 20,
      widthSegments: 80
    })

    this.mediaRenderTarget = new RenderTarget(this.gl)
    this.medias = Object.entries(this.collectionsImg).map(([index, el]) => {
      return new Media({ el, gl, scene: this.group, canvasSize, canvasSizePixel, geometry: this.geometry, index })
    })

    this.mediasBuffer = Object.entries(this.collectionsImg).map(([index, el]) => {
      return new Media({ el, gl, scene: this.group, canvasSize, canvasSizePixel, geometry: this.geometry })
    })

    this.clock = new Clock()
    this.mouse = new Vec2(-1)
    this.oldMouse = new Vec2()
    this.velo = new Vec2(-1)
    this.uVelo = new Vec2()
    this.delta = 0
    this.canvas = canvas

    this.bufferRenderObject = this.createPlaneBuffer()
    this.createLastPlane()

    // this.group.setParent(this.scene)


  }
  init(s) {
    this.canvas.raf.stop()
    this.canvas.raf = new N.RafR(() => {
      if (!this.velo.needsUpdate) {
        this.mouse.set(-1)
        this.velo.set(0)
      }
      this.velo.needsUpdate = false
      console.log(this.velo);

      this.uVelo.lerp(this.velo, !!this.velo.len() ? 0.1 : 0.1)

      this.bufferRenderObject.mesh.program.uniforms.uVelo.value = this.uVelo

      this.canvas.renderer.render({
        camera: this.canvas.camera,
        scene: this.bufferRenderObject.scene,
        target: this.mask.write,
        clear: false
      })
      this.mask.swap()

      this.canvas.renderer.render({
        scene: this.group,
        target: this.mediaRenderTarget,
        camera: this.canvas.camera
      })


      // this.bufferRenderObject.mesh.program.uniforms.tMap.value = this.mask.target.texture

      // this.medias.program.uniforms.tMap.value = this.uniform

      this.lastPlane.program.uniforms.tMap.value = this.mediaRenderTarget.texture

      this.canvas.renderer.render({
        scene: this.scene,
        camera: this.canvas.camera,
      })
    })
    this.canvas.raf.run()
    if (s) {
      s()
    }
  }

  onMouseMove(e) {
    if (!this.mousemoveON) return
    let bY = this.collectionBounds.y < 0 ? this.collectionBounds.y + this.canvasSizePixel.height : this.collectionBounds.y
    if (e.x < this.collectionBounds.x || e.x > this.collectionBounds.x + this.collectionBounds.width || e.y < bY || e.y > bY + this.collectionBounds.height) {
      return
    }
    this.oldMouse.copy(this.mouse)
    // this.scroll.target += e.deltaY / 100
    // const x = (e.x - this.collectionBounds.x) / this.collectionBounds.width
    // const bY = this.collectionBounds.y + this.canvasSizePixel.height
    // const y = 1 - N.iLerp(e.y, bY, this.collectionBounds.height + bY)

    const x = e.x / this.canvasSizePixel.width
    const y = 1 - e.y / this.canvasSizePixel.height
    this.bufferRenderObject.mesh.program.uniforms.x.value = x
    this.bufferRenderObject.mesh.program.uniforms.y.value = y

    this.mouse.set(x, y)

    let delta = this.clock.getDelta() || 14
    this.velo.x = N.Clamp(5 * (this.mouse.x - this.oldMouse.x) / delta, -1, 1)
    this.velo.y = N.Clamp(1 * (this.mouse.y - this.oldMouse.y) / delta, -1, 1)
    this.velo.needsUpdate = true

  }

  createPlaneBuffer() {

    let sceneBuffer = new Transform()

    this.uniform = { value: null }
    this.collectionBounds = N.get('.display__container a.link__spa').getBoundingClientRect()

    let gl = this.gl
    let type = gl.HALF_FLOAT
    let minFilter = (() => {
      if (gl.renderer.isWebgl2) return gl.LINEAR;
      if (gl.renderer.extensions[`OES_texture_${type === gl.FLOAT ? '' : 'half_'}float_linear`]) return gl.LINEAR;
      return gl.NEAREST;
    })();
    let option = {
      width: this.canvasSizePixel.width,
      height: this.canvasSizePixel.height,
      minFilter,
      internalFormat: gl.renderer.isWebgl2 ? (type === gl.FLOAT ? gl.RGBA32F : gl.RGBA16F) : gl.RGBA,
      format: gl.RGBA,
      depth: false,
      type
    }

    this.mask = {
      write: new RenderTarget(this.gl, option),
      read: new RenderTarget(this.gl, option),
      swap: _ => {
        let temp = this.mask.read
        this.mask.read = this.mask.write
        this.mask.write = temp
        this.uniform.value = this.mask.read.texture
      }
    }
    this.mask.swap()
    const resolution = { value: new Vec2() }
    // resolution.value.set(this.gl.canvas.width, this.gl.canvas.height)
    resolution.value.set(this.collectionBounds.width, this.collectionBounds.height)
    let programBuffer = new Program(this.gl, {
      fragment: BufferFrag,
      vertex: BasicVer,
      uniforms: {
        tMap: this.uniform,
        resolution,
        x: {
          value: .5
        },
        y: {
          value: 0
        },
        uVelo: {
          value: this.uVelo
        }
      },
      // depthTest: false
    })

    let backgroundBufferMesh = new Mesh(this.gl, {
      geometry: new Plane(this.gl),
      program: programBuffer,
    })

    let renderObject = {
      mesh: backgroundBufferMesh, scene: sceneBuffer,
    }

    backgroundBufferMesh.setParent(sceneBuffer)
    backgroundBufferMesh.scale.x = this.canvasSize.width
    backgroundBufferMesh.scale.y = this.canvasSize.height

    // backgroundBufferMesh.scale.x = this.collectionBounds.width / this.canvasSizePixel.width * this.canvasSize.width
    // backgroundBufferMesh.scale.y = this.collectionBounds.height / this.canvasSizePixel.height * this.canvasSize.height

    // backgroundBufferMesh.position.x = 0
    // backgroundBufferMesh.position.y = (-this.canvasSizePixel.height / 2 - this.collectionBounds.y - this.collectionBounds.height / 2) / this.canvasSizePixel.height * this.canvasSize.height

    return renderObject
  }
  createLastPlane() {
    this.lastPlane = new Mesh(this.gl, {
      geometry: new Plane(this.gl),
      program: new Program(this.gl, {
        vertex: BasicVer,
        fragment: LastFrag,
        uniforms: {
          tGridFlow: this.uniform,
          tMap: {
            value: new Texture(this.gl)
          }
        }
      })
    })
    this.lastPlane.scale.y = this.canvasSize.height
    this.lastPlane.scale.x = this.canvasSize.width

    this.lastPlane.setParent(this.scene)
  }
  update(t) {

    if (!this.velo.needsUpdate) {
      this.mouse.set(-1)
      this.velo.set(0)
    }
    this.velo.needsUpdate = false

    // this.uVelo.target = 0.5 * Math.sqrt(this.velo.x ** 2 + this.velo.y ** 2)
    // this.uVelo.cur = N.Lerp(this.uVelo.cur, this.uVelo.target, !!this.uVelo.target ? 0.1 : 0.05)
    this.uVelo.lerp(this.velo, !!this.velo.len() ? 0.1 : 0.05)


    // this.bufferRenderObject.mesh.program.uniforms.uVelo.value = N.Clamp(this.uVelo.cur, 0, 1)
    this.bufferRenderObject.mesh.program.uniforms.uVelo.value = this.uVelo

    this.renderer.render({
      camera: this.camera,
      scene: this.bufferRenderObject.scene,
      target: this.mask.write,
      clear: false
    })
    this.mask.swap()

    // this.bufferRenderObject.mesh.program.uniforms.tMap.value = this.mask.target.texture

    // this.gallery[0].program.uniforms.tMap.value = this.uniform

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    })
  }
  onResize(canvasSizePixel, canvasSize) {
    this.canvasSizePixel = canvasSizePixel;
    this.canvasSize = canvasSize;
    [...this.medias, ...this.mediasBuffer].forEach(m => {
      m.onResize(this.canvasSize, this.canvasSizePixel)
    })

    this.collectionBounds = N.get('.display__container a.link__spa').getBoundingClientRect()
    this.lastPlane.scale.y = this.canvasSize.height
    this.lastPlane.scale.x = this.canvasSize.width
    this.bufferRenderObject.mesh.scale.x = this.canvasSize.width
    this.bufferRenderObject.mesh.scale.y = this.canvasSize.height
    this.bufferRenderObject.mesh.program.uniforms.resolution.value.set(this.collectionBounds.width, this.collectionBounds.height)
    this.getBounds()
  }

  getBounds() {
    [...this.medias, ...this.mediasBuffer].forEach(m => {
      m.getBounds(this.canvasSize, this.canvasSizePixel)
    })
  }

  destroy() {
    this.scene.removeChild(this.lastPlane)
    this.canvas.raf.stop()
    this.canvas.raf = new N.RafR(this.canvas.update)
    this.canvas.raf.run()
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
