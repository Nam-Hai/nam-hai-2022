import { collectionsService } from "../../animation/collectionsAnimationService";
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
    const cInfo = collectionsService.getInfo()
    this.d = N.get('.detail__wrapper')
    const p = N.get('.p__container', node)
    p.innerHTML = cInfo.detailHTML
    this.d.style.setProperty('--bg-color', cInfo.bg)
    this.d.style.setProperty('--main-color', cInfo.c)

    const images = N.getAll('img', p)
    Object.values(images).forEach(img => {
      img.onload = _ => {
        N.O(img, 1)
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
