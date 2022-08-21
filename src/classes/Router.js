import Preloader from '../Pages/preloader/preloader';
// import homeTemplate from '../views/home.html?raw'
import Home from '../Pages/Home/home';


export default class Router {

  constructor() {
    this.path = window.location.pathname
    this.pageManager = {
      '/home': Home
    }
  }

  updatePath() {
    this.path = window.location.pathname
  }

  getPage(route) {
    return this.pageManager[route]
  }


  resetPath() {
    window.history.pushState('', 'Nam Hai portfolio', '/')
  }

}

