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
    this.preloader.render(this.main)
  }

  createPage() {
    this.template = Object.entries(this.router.paths).filter(([path, template]) => path == this.router.path).map(a => a[1])

  }

  // handleRoute() {
  //   let template = Object.entries(this.router.paths).filter(([path, template]) => path == this.router.path).map(a => a[1])
  //   template = template.length ? template[0] : this.router.paths['/'] && window.history.pushState('historyInfo', 'Nam Hai', '/')

  //   const divContent = N.Cr('div')
  //   divContent.innerHTML = template
  //   const page = N.get('#h')
  //   page.innerHTML = divContent.innerHTML



  // }


}

new App()
