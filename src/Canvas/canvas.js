import { Renderer, Camera, Transform } from 'ogl'
import { N } from '../utils/namhai';
import CollectionsCanvas from './Collections/collectionsCanvas';
import ContactCanvas from './Contact/contactCanvas';
import HomeCanvas from './Home/homeCanvas';
import DemoCanvas from './Demo/demoCanvas';
import PreloaderCanvas from './Preloader/PreloaderCanvas';

class Canvas {
  constructor() {
    this.mapRouteObject = {
      home: this.createHome,
      demo: this.createDemo,
      collections: this.createCollections,
      contact: this.createContact,
      preloader: this.createPreloader
    };

    this.sizePixel = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()

    N.BM(this, ['update'])
    this.raf = new N.RafR(this.update)
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true
    })
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

  getCurrent() {
    return this[this.route]
  }

  createDemo() {
    this.demo = new DemoCanvas({
      gl: this.gl,
      scene: this.scene,
      canvasSize: this.size,
      canvasSizePixel: this.sizePixel
    })
  }

  createPreloader() {
    this.preloader = new PreloaderCanvas({
      gl: this.gl,
      scene: this.scene,
      canvasSize: this.size,
      canvasSizePixel: this.sizePixel
    })
  }
  createHome() {
    this.home = new HomeCanvas({
      gl: this.gl,
      scene: this.scene,
      canvasSize: this.size,
      canvasSizePixel: this.sizePixel
    })
  }
  createCollections() {
    this.collections = new CollectionsCanvas({
      gl: this.gl,
      scene: this.scene,
      canvasSize: this.size,
      canvasSizePixel: this.sizePixel
    })
  }

  createContact() {
    this.contact = new ContactCanvas({
      gl: this.gl,
      scene: this.scene,
      canvasSize: this.size,
      canvasSizePixel: this.sizePixel
    })
  }

  onChange(route) {
    this.route = route
    if (this.mapRouteObject.hasOwnProperty(route)) {
      const createNewObject = this.mapRouteObject[route].bind(this)
      createNewObject()

    }
  }

  onResize(route) {
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

    if (route && this[route] && this[route].onResize) {
      this[route].onResize(this.sizePixel, this.size)
    }
  }

  update() {

    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    })

  }

  show() {
    // if (this[this.route] && this[this.route].show) this[this.route].show()

    this.raf.run()
  }
  async hide(route) {
    // if (this[this.route] && this[this.route].hide) {
    // await this[this.route].hide()
    // }
    if (this[route] && this[route].hide)
      await this[route].hide()
  }
}

export const canvas = new Canvas()
