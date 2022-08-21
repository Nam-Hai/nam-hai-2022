import './styles/index.scss'
import Router from './classes/Router'
import { N } from './utils/namhai'
import ressortButton from './components/ressortButton/ressortButton'
import Preloader from './Pages/preloader/preloader'

class App {
  constructor() {
    this.main = N.get('main')
    this.router = new Router()

    this.createPreloader()

  }

  createPreloader() {
    this.preloader = new Preloader()
    this.page = this.preloader
    this.preloader.render(this.main)
    this.addLinkLinstener(this.main)
    this.addEventListener()
  }

  createPage() {
    this.page = new this.router.pageManager[this.router.path]
  }

  addLinkLinstener(context) {
    let links = N.getAll('a', context)
    if (!links) return
    if (!(links instanceof window.NodeList)) links = [links]
    for (const link of links) {
      console.log('link', link);
      link.addEventListener('click', (e) => {
        const href = link.href
        N.PD(e)
        this.onChange({ url: href, button: link })
      })
    }
  }

  addEventListener() {
    window.addEventListener('mousedown', this.onMouseDown.bind(this))
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('mouseup', this.onMouseUp.bind(this))
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

  async onChange({ url, button }) {

    window.history.pushState('', 'Nam Hai portfolio', url)
    await this.preloader.hide()
    this.page = null
    this.createPage()
  }
}

new App()
