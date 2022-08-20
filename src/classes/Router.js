import Preloader from '../Pages/preloader';
import homeTemplate from '../views/home.html?raw'

export default class Router {

  constructor() {
    this.path = window.location.pathname
    this.pathsManager = {
      // '/': Preloader,
      '/home': homeTemplate
    }



  }



}

