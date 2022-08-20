import homeTemplate from '../views/home.html?raw'
import preloaderTemplate from '../views/preloader.html?raw'

export default class Router {

  constructor() {
    this.path = window.location.pathname
    console.log(this.path);
    this.paths = {
      '/': preloaderTemplate,
      '/home': homeTemplate
    }

  }

}

