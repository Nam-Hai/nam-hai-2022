import './styles/index.scss'
import Router from './classes/Router'
import { N } from './utils/namhai'
import { canvas } from './Canvas/canvas'
import Preloader from './Pages/Preloader/preloader'

class App {
  constructor() {
    this.main = N.get('.main')
    this.router = new Router()

    this.onResize()
    this.createPreloader()
    // this.initPage()
  }

  initPage() {
    const url = 'collections'
    window.history.pushState('', 'Nam Hai portfolio', url)
    this.page = this.createPage(url)

    this.page.content.remove()

    this.router.path = url
    this.page.render(this.main)
    this.page.renderComponents(this.main)
    this.addLinkLinstener(this.main)
    this.addEventListener()
    this.createCanvas()
    this.canvas.show()
  }

  async createPreloader() {
    this.router.resetPath()
    this.preloader = new Preloader()
    this.page = this.preloader
    this.preloader.render(this.main)
    this.page.renderComponents(this.main)
    this.addLinkLinstener(this.main)
    this.addEventListener()
    this.createCanvas()
    this.canvas.show()
    await new Promise(s => {
      this.canvas.preloader.loadTexture(s)
    })
    this.onChange({ url: 'demo' })
  }

  createCanvas() {
    this.canvas = canvas
    this.canvas.onChange(this.router.getRoute())
  }

  createPage(route) {
    return new (this.router.getPage(route))()
  }

  addLinkLinstener(context) {
    let links = N.getAll('.link__spa', context)
    if (!links) return
    if (!(links instanceof window.NodeList)) links = [links]
    for (const link of links) {
      link.addEventListener('click', (e) => {
        const href = N.Ga(link, 'href')
        N.PD(e)
        this.onChange({ url: href, button: link })
      })
    }
  }

  addEventListener() {
    window.addEventListener('mousedown', this.onMouseDown.bind(this))
    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onMouseUp.bind(this))
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('mouseup', this.onMouseUp.bind(this))
    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize(e) {
    if (window.innerWidth < 800) {
      if (!this.mobileState) {
        this.mobile = N.Cr('div')
        this.mobile.classList.add('mobile')
        this.mobile.innerHTML = 'this portfolio is meant for desktop experience<img src="home/home4.jpg"><div class="mobile-footer"><a href="mailto:lucas.tran@imt-atlantique.net">mail</a><a href="https://www.linkedin.com/in/tran-lucas/" target="_blank">Linkedin</a></div>'


        document.body.appendChild(this.mobile)
        // this.mobile.appendChild(this.footer)
      }
      this.mobileState = true
    } else if (this.mobileState) {
      this.mobile.remove()
      this.mobileState = false
    }
    canvas.onResize(this.router.path)
  }

  onTouchDown(e) {
    // let event = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  onTouchMove(e) {
    let event = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    this.onMouseMove(event)
  }
  onMouseDown(e) {

  }

  onMouseMove(e) {
    if (this.canvas) {
      this.canvas.onMouseMove(e)
    }
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

    this.pageBuffer = this.createPage(url)
    this.pageBuffer.render(N.get('.buffer-main'))
    this.pageBuffer.renderComponents(N.get('.buffer-main'))
    await this.page.hide()
    await this.router.transitionOnChange(url, this.canvas, this.pageBuffer.content)
    this.page = null

    this.page = this.pageBuffer
    this.main.setAttribute('style', '')
    this.main.setAttribute('data-template', url)
    this.main.innerHTML = this.page.nodeParent.innerHTML

    this.page.content.classList = 'main'
    this.page.content.style = ''
    this.main.remove()

    this.main = this.page.content

    this.addLinkLinstener(this.main)
    this.main.setAttribute('data-init', 'false')

    this.router.path = url

    if (push) window.history.pushState('', 'Nam Hai portfolio', url)

  }



  onPopState() {
    this.onChange({
      url: window.location.pathname.slice(1),
      push: false
    })
  }
}

new App()
