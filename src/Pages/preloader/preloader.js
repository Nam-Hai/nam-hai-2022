import Page from "../../classes/Page"
import ressortButton from "../../components/ressortButton/ressortButton"
import preloaderTemplate from "./preloader.html?raw"

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

    this.components['ressort-button'].forEach(element => {
      console.log(element);
      element.addCallback()
    });
  }

  onMouseMove(e) {
    this.components['ressort-button'].forEach(c => {
      c.onMouseMove(e)
    })
  }
  onMouseUp(e) {
    this.components['ressort-button'].forEach(c => {
      c.onMouseUp(e)
      console.log('addeventlistner');
    })
  }
}
