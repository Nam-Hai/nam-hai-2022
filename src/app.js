import './styles/index.scss'
import Router from './classes/Router'
import { N } from './utils/namhai'
import ressortButton from './components/ressortButton/ressortButton'
import Preloader from './Pages/preloader/preloader'
import Canvas from './Canvas/canvas'

class App {
  constructor() {
    this.main = N.get('main')
    this.router = new Router()

    this.createPreloader()

  }

  createPreloader() {
    this.router.resetPath()
    this.preloader = new Preloader()
    this.page = this.preloader
    this.preloader.render(this.main)
    this.addLinkLinstener(this.main)
    this.addEventListener()
    this.createCanvas()
  }

  createCanvas() {
    this.canvas = new Canvas({ route: this.router.getRoute() })
  }

  createPage(route) {
    return new (this.router.getPage(route))()
  }

  addLinkLinstener(context) {
    let links = N.getAll('a', context)
    if (!links) return
    if (!(links instanceof window.NodeList)) links = [links]
    for (const link of links) {
      console.log('link', link);
      link.addEventListener('click', (e) => {
        console.log(link);
        const href = N.Ga(link, 'href')
        // const href = link.href
        N.PD(e)
        this.onChange({ url: href, button: link })
      })
    }
  }

  addEventListener() {
    window.addEventListener('mousedown', this.onMouseDown.bind(this))
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('mouseup', this.onMouseUp.bind(this))
    window.addEventListener('popstate', this.onPopState.bind(this))
  }

  onMouseDown(e) {

  }

  onMouseMove(e) {
    if (this.page) {
      this.page.onMouseMove(e)
    }
  }

  onMouseUp(e) {
    if (this.page) {
      this.page.onMouseUp(e)
    }
  }

  async onChange({ url, button, push = true }) {

    await this.preloader.hide()
    this.page = null
    this.page = this.createPage(url)



    this.page.render(this.main)

    this.router.path = url
    if (push) window.history.pushState('', 'Nam Hai portfolio', url)
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }
}

new App()
