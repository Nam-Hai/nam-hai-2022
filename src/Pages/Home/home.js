import homeFixation from "../../animation/homeFixation";
import homeTextTransform from "../../animation/homeTextTransform";
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

    let titles = N.getAll('.background__title div', node)
    stringLetterToSpan(titles[0])
    stringLetterToSpan(titles[1])
    this.titleSpaned = [N.getAll('span', titles[0]), N.getAll('span', titles[1])]

    for (const title of this.titleSpaned) {
      Object.entries(title).forEach(([index, letter]) => {
        N.T(letter, 1.195 * (title.length - index), 0, 'rem')
      })
    }

    let htI = N.get('.htI', node)
    stringLetterToDoubleSpan(htI, 'tooltip__span')
    let htC = N.get('.htC', node)
    stringLetterToDoubleSpan(htC, 'tooltip__span')

  }
  renderComponents(node) {
    super.renderComponents(node)
    this.hero = N.get('.hero img', node)
    this.addEventListener()

  }

  addEventListener() {
    this.clickBool = false
    this.hero.addEventListener('click', async _ => {
      if (this.clickBool) return
      this.clickBool = true
      this.hero.classList.add('d-cursor')
      await new Promise(s => {

        if (this.currentState == 3) this.currentState = 0
        const cA = new homeTextTransform(s, this.currentState)
        cA.play()
        this.currentState++
      })

      this.hero.classList.remove('d-cursor')
      this.clickBool = false
    })


    console.log('addEvent Home');
    this.hero.addEventListener('mouseenter', _ => {
      new homeFixation().play()
    })
    this.hero.addEventListener('mouseleave', _ => {
      new homeFixation(true).play()
    })
  }
}
