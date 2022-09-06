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

    const wrapper = N.get('.collections__wrapper', node)
    wrapper.style.color = info.c
    wrapper.style.backgroundColor = info.bg


    let navn = N.get('.nav__title__name', node)
    navn.innerHTML = info.name

    let navf = N.get('.nav__title__flavour', node)
    navf.innerHTML = info.flavour

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
    current__page.innerHTML = info.index
    for (const q of N.getAll('span span', current__page)) {
      N.T(q, 0, 0)
    }

    // node.style.backgroundColor = info.bg
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
