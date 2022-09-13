import Page from "../../classes/Page"
import preloaderTemplate from "./preloader.html?raw"

export default class Preloader extends Page {
  constructor() {

    super({
      content: preloaderTemplate,
      name: 'preloader'
    })
  }


}
