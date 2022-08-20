import Preloader from '../Pages/preloader';
import homeTemplate from '../views/home.html?raw'

export default class Router {

  constructor() {
    this.path = window.location.pathname
    console.log(this.path);
    this.pathsManager = {
      // '/': Preloader,
      '/home': homeTemplate
    }



  }



}

