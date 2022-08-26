import Page from "../../classes/Page";
import gridFixation from "../../components/gridFixation/gridFixation";
import ressortButton from "../../components/ressortButton/ressortButton";
import { stringLetterToDoubleSpan } from "../../utils/utilsText";
import collectionsTemplate from './collections.html?raw'
import { N } from "../../utils/namhai";
import { collectionsService } from "../../animation/collectionsNext";

export default class Collections extends Page {
  constructor() {
    super({
      components: {
        'ressort-button': ressortButton,
        'grid-fixation': gridFixation
      },
      content: collectionsTemplate,
      name: 'collections'
    })

  }

  render(node) {
    super.render(node)

    const info = collectionsService.getInfo()

    const fixations = N.getAll('.fixation')
    fixations.forEach(f => {
      f.style.backgroundColor = info.c
    })
    let navn = N.get('.nav__title__name')
    navn.innerHTML = info.name
    stringLetterToDoubleSpan(navn, 'tooltip__span')

    let navf = N.get('.nav__title__flavour')
    navf.innerHTML = info.flavour
    stringLetterToDoubleSpan(navf, 'tooltip__span')

    navf.style.color = info.c
    navn.style.color = info.c
    let r = N.getAll('ressort-button')
    r.forEach(r => {
      r.style.color = info.c
      N.get('button', r).style.backgroundColor = info.c
    })

    N.get('main').style.backgroundColor = info.bg
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

}
