import { Renderer, Camera, Transform } from 'ogl'
import { N } from '../utils/namhai';
import HomeCanvas from './Home/HomeCanvas';
import PreloaderCanvas from './preloader/PreloaderCanvas';

export default class Canvas {
  constructor({ route }) {
    this.route = route
    console.log('this.route', this.route);

    this.mapRouteObject = {
      home: this.createHome,
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
    this.onChange(route)

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

  createPreloader() {
    this.preloader = new PreloaderCanvas({
      gl: this.gl,
      scene: this.scene,
      canvasSize: this.size,
      canvasSizePixel: this.sizePixel
    })
  }
  createHome() {
    console.log('this.createHome');
    this.home = new HomeCanvas({
      gl: this.gl,
      scene: this.scene,
      canvasSize: this.size,
      canvasSizePixel: this.sizePixel
    })

    console.log('this[this.route]', this[this.route]);
  }

  onChange(route) {
    console.log('canvas onchange', route);
    this.route = route
    if (this.mapRouteObject.hasOwnProperty(route)) {
      const createNewObject = this.mapRouteObject[route].bind(this)
      createNewObject()

    }
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

    this.raf.run()
  }
  async hide() {
    if (this[this.route] && this[this.route].hide()) {
      await this[this.route].hide()
    }
  }
}
