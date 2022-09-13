import Preloader from '../Pages/Demo/demo';
import Home from '../Pages/Home/home';
import Collections from '../Pages/Collections/collections';
import TransitionHomeCollections from '../animation/TransitionHomeCollections';
import TransitionDemoHome from '../animation/TransitionDemoHome';
import TransitionCollectionsHome from '../animation/TransitionCollectionsHome';
import Contact from '../Pages/Contact/contact';
import TransitionHomeContact from '../animation/TransitionHomeContact';
import TransitionContactHome from '../animation/TransitionContactHome';
import { N } from '../utils/namhai';
import Demo from '../Pages/Demo/demo';

const transitionMap = new Map([
  ['home => collections', TransitionHomeCollections],
  ['collections => home', TransitionCollectionsHome],
  ['demo => home', TransitionDemoHome],
  ['home => contact', TransitionHomeContact],
  ['contact => home', TransitionContactHome]
])

export default class Router {

  constructor() {
    this.pageManager = {
      'home': Home,
      'collections': Collections,
      'contact': Contact,
      'demo': Demo
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
      N.PE.none(document.body)
      await new Promise(s => {
        t = new t({ cb: s, canvas, oldRoute: this.path, route: url })
        t.play()
      })
      N.PE.all(document.body)
    } else {
      canvas.hide(this.path)
      canvas.onChange(url)
    }
  }
}

