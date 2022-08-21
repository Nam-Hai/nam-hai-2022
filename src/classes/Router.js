import Preloader from '../Pages/preloader/preloader';
// import homeTemplate from '../views/home.html?raw'
import Home from '../Pages/Home/home';


export default class Router {

  constructor() {
    this.pageManager = {
      'home': Home
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

