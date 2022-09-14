import homeFixation from "../../animation/homeFixation";
import { TEXTURE } from "../../Canvas/preloader/PreloaderCanvas";
import Page from "../../classes/Page";
import gridFixation from "../../components/gridFixation/gridFixation";
import ressortButton from "../../components/ressortButton/ressortButton";
import { N } from "../../utils/namhai";
import { stringLetterToDoubleSpan, stringLetterToSpan } from "../../utils/utilsText";
import homeTemplate from "./home.html?raw"

export default class Home extends Page {
  constructor() {
    super({
      components: {
        'grid-fixation': gridFixation,
        'ressort-button': ressortButton
      },
      content: homeTemplate,
      name: 'home'
    })
    this.currentState = 0

    N.BM(this, ['addEventListener'])
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

  render(node) {
    super.render(node)

    let htI = N.get('.htI', node)
    stringLetterToDoubleSpan(htI, 'tooltip__span')
    let htC = N.get('.htC', node)
    stringLetterToDoubleSpan(htC, 'tooltip__span')

  }

  renderComponents(node) {
    super.renderComponents(node)
    this.hero = N.get('.hero img', node)
  }

  addEventListener() {
    this.hero.addEventListener('mouseenter', _ => {
      new homeFixation().play()
    })
    this.hero.addEventListener('mouseleave', _ => {
      new homeFixation(true).play()
    })
  }
}
