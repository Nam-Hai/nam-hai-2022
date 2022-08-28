import Preloader from '../Pages/preloader/preloader';
// import homeTemplate from '../views/home.html?raw'
import Home from '../Pages/Home/home';
import Collections from '../Pages/Collections/collections';
import TransitionHomeCollections from '../animation/TransitionHomeCollections';
import TransitionPreloaderHome from '../animation/TransitionPreloaderHome';

const transitionMap = new Map([
  ['home => collections', TransitionHomeCollections],
  ['preloader => home', TransitionPreloaderHome]
])

export default class Router {

  constructor() {
    this.pageManager = {
      'home': Home,
      'collections': Collections
    }

  }

  getPage(route) {
    return this.pageManager[route] || Home
  }

  getRoute() {
    return this.path
  }

  resetPath() {
    window.history.pushState('', 'Nam Hai portfolio', '/')
    this.path = 'preloader'
  }

  async transitionOnChange(url, canvas) {
    const key = this.path + ' => ' + url
    let t = transitionMap.get(key)
    if (t) {
      await new Promise(s => {
        t = new t({ cb: s, canvas, oldRoute: this.path, route: url })
        t.play()
      })
    } else {
      canvas.hide(this.path)
      canvas.onChange(url)
    }
  }
}

