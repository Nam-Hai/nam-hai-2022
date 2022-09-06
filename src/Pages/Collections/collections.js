import Page from "../../classes/Page";
import gridFixation from "../../components/gridFixation/gridFixation";
import ressortButton from "../../components/ressortButton/ressortButton";
import { stringLetterToDoubleSpan } from "../../utils/utilsText";
import collectionsTemplate from './collections.html?raw'
import { N } from "../../utils/namhai";
import { collectionsService } from "../../animation/collectionsAnimationService";

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



  }
  renderComponents(node) {
    super.renderComponents(node)
    const info = collectionsService.getInfo()

    const fixations = N.getAll('.fixation', node)
    fixations.forEach(f => {
      f.style.backgroundColor = info.c
    })
    let navn = N.get('.nav__title__name', node)
    navn.innerHTML = info.name

    let navf = N.get('.nav__title__flavour', node)
    navf.innerHTML = info.flavour

    navf.style.color = info.c
    navn.style.color = info.c
    let r = N.getAll('ressort-button', node)
    if (r) {
      r.forEach(r => {
        r.style.color = info.c
        let b = N.get('button', r)
        if (b) b.style.backgroundColor = info.c
      })
    }


    let bP = N.get('.total__page__wrapper')
    bP.innerHTML = ''
    let totalPage = N.Cr('div'),
      bufferTotalPage = N.Cr('div')
    totalPage.classList.add('total__page')
    bufferTotalPage.classList.add('total__page__buffer')

    const l = collectionsService.collectionsInfo.length
    totalPage.innerHTML = l > 9 ? l : '0' + l
    stringLetterToDoubleSpan(totalPage, 'tooltip__span')
    bufferTotalPage.innerHTML = totalPage.innerHTML

    bP.appendChild(totalPage)
    bP.appendChild(bufferTotalPage)

    bP.style.color = info.c
    let current__page = N.get('.current__page')
    current__page.style.color = info.c
    current__page.innerHTML = collectionsService.getInfo().index
    for (const q of N.getAll('span span', current__page)) {
      N.T(q, 0, 0)
    }

    let back = N.get('.back__tooltip')
    back.style.color = info.c

    node.style.backgroundColor = info.bg
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
