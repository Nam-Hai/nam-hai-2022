import Page from "../../classes/Page"
import ressortButton from "../../components/ressortButton/ressortButton"
import preloaderTemplate from "./preloader.html?raw"
import { N } from "../../utils/namhai";
import { stringLetterToDoubleSpan } from '../../utils/utilsText'

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
      element.addCallback()
    });
  }

  render(node) {
    super.render(node)

    // let succes = N.get('.ressort__demo__success')

    // stringLetterToDoubleSpan(succes, 'tooltip__span')
  }

  onMouseMove(e) {
    this.components['ressort-button'].forEach(c => {
      c.onMouseMove(e)
    })
  }
  onMouseUp(e) {
    this.components['ressort-button'].forEach(c => {
      c.onMouseUp(e)
    })
  }

  async hide() {
    this.ressort = this.components['ressort-button'][0]
    console.log('huide', this.ressort.button);
    return new Promise(res => {
      let raf = new N.RafR(() => {
        if (this.ressort.end) {
          let motion = new N.M({
            el: this.components['ressort-button'][0].button,
            p: {
              s: [1, 9]
            },
            d: 1000,
            e: 'o6',
            cb: () => {
              res()
            }
          })
          motion.play()
          raf.stop()
        }
      })
      raf.run()
    })
  }
}
