import { Renderer, Camera, Transform } from 'ogl'

export default class Canvas {
  constructor({ route }) {
    this.route = route

    this.sizePixel = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()

  }

  createRenderer() {
    this.renderer = new Renderer()
    this.gl = this.renderer.gl
    document.body.appendChild(this.gl.canvas)
  }
  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5
  }
  createScene() {
    this.scene = new Transform()
  }


  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.sizePixel = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.camera.perspective({
      aspect: this.sizePixel.width / this.sizePixel.height
    })
    const fov = this.camera.fov * Math.PI / 180

    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    this.size = {
      height: height,
      width: height * this.camera.aspect
    }
  }

  update() {

    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    })
  }

  show() {
    if (this[this.route] && this[this.route].show) this[this.route].show()
  }

}
