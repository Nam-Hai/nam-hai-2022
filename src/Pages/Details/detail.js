import { collectionsService } from "../../animation/collectionsAnimationService";
import { fixationState } from "../../animation/homeFixation";
import Page from "../../classes/Page";
import { N } from "../../utils/namhai";
import detailTemplate from './detail.html?raw'

export default class Detail extends Page {
  constructor() {
    super({
      content: detailTemplate,
      name: 'detail'
    })

  }

  renderComponents(node) {
    super.renderComponents(node)
    fixationState[0] = true
    const cInfo = collectionsService.getInfo()
    this.d = N.get('.detail__wrapper')
    const p = N.get('.p__container', node)
    p.innerHTML = cInfo.detailHTML
    this.d.style.setProperty('--bg-color', cInfo.bg)
    this.d.style.setProperty('--main-color', cInfo.c)

    const titleFlavour = N.get('.nav__title__flavour', node)
    const titleName = N.get('.nav__title__name', node)
    titleFlavour.innerText = cInfo.dF
    titleName.innerText = cInfo.dN

    const images = N.getAll('img', p)
    Object.values(images).forEach(img => {
      img.style.transform = 'scale(1.1)'
      img.onload = _ => {
        N.O(img, 1)
      }

      const fullSizedImage = new Image()
      fullSizedImage.src = 'detail' + img.getAttribute('src').slice(15)
      fullSizedImage.onload = _ => {
        img.src = fullSizedImage.src
        img.style.transform = 'scale(1)'
      }
    })
    this.addEventListener()
  }
  addEventListener() {
    this.d.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll(e) {
  }
}
