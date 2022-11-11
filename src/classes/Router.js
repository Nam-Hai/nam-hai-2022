import Preloader from '../Pages/Preloader/preloader';
import Home from '../Pages/Home/home';
import Collections from '../Pages/Collections/collections';
import Demo from '../Pages/Demo/demo';
import TransitionHomeCollections from '../animation/TransitionHomeCollections';
import TransitionDemoHome from '../animation/TransitionDemoHome';
import TransitionCollectionsHome from '../animation/TransitionCollectionsHome';
import Contact from '../Pages/Contact/contact';
import TransitionHomeContact from '../animation/TransitionHomeContact';
import TransitionContactHome from '../animation/TransitionContactHome';
import { N } from '../utils/namhai';
import TransitionPreloaderDemo from '../animation/TransitionPreloaderDemo';
import Detail from '../Pages/Details/detail';
import TransitionDetailCollections from '../animation/TransitionDetailCollections'

const transitionMap = new Map([
  ['home => collections', TransitionHomeCollections],
  ['collections => home', TransitionCollectionsHome],
  ['detail => collections', TransitionDetailCollections],
  ['demo => home', TransitionDemoHome],
  ['home => contact', TransitionHomeContact],
  ['contact => home', TransitionContactHome],
  ['preloader => demo', TransitionPreloaderDemo]
])

export default class Router {

  constructor() {
    this.pageManager = {
      'home': Home,
      'collections': Collections,
      'contact': Contact,
      'demo': Demo,
      'preloader': Preloader,
      'detail': Detail
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

  async transitionOnChange(url, canvas, pageBufferContent) {
    const key = this.path + ' => ' + url
    let t = transitionMap.get(key)
    if (t) {
      N.PE.none(document.body)
      await new Promise(s => {
        t = new t({ cb: s, canvas, oldRoute: this.path, route: url, pageBufferContent })
        t.play()
      })
      N.PE.all(document.body)
    } else {
      pageBufferContent.classList.add('buffer-main__cover')
      canvas.hide(this.path)
      canvas.onChange(url)
    }
  }
}

