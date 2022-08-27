import Preloader from '../Pages/preloader/preloader';
// import homeTemplate from '../views/home.html?raw'
import Home from '../Pages/Home/home';
import Collections from '../Pages/Collections/collections';


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

}

