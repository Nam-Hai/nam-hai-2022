import './styles/index.scss'
import Router from './classes/Router'
import { N } from './utils/namhai'
import ressortButton from './components/ressortButton/ressortButton'

class App {
  constructor() {
    this.router = new Router()
    this.handleRoute()

  }

  handleRoute() {
    console.log(this.router.path == '/');
    let template = Object.entries(this.router.paths).filter(([path, template]) => path == this.router.path).map(a => a[1])
    template = template.length ? template[0] : this.router.paths['/'] && window.history.pushState('historyInfo', 'Nam Hai', '/')

    const divContent = N.Cr('div')
    divContent.innerHTML = template
    const page = N.get('#h')
    page.innerHTML = divContent.innerHTML


    let ressort = N.getAll('ressortButton', page)
    console.log(ressort);
    ressort = [...ressort].map(el => new ressortButton({ element: el }));
    console.log(ressort);
  }
}

new App()
