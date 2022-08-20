import Page from "../classes/Page"
import ressortButton from "../components/ressortButton/ressortButton"
import preloaderTemplate from "../views/preloader.html?raw"

export default class Preloader extends Page {
  constructor() {

    super({
      elements: {
        number: '.preloader__number'
      },
      components: {
        'ressort-button': ressortButton
      },
      content: preloaderTemplate,
      name: 'preloader'
    })
  }
}
