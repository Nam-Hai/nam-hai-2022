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

    const p = N.get('.p__container', node)
    p.innerHTML = collectionsService.getInfo().detailHTML

    this.addEventListener()
  }
  addEventListener() {
    this.d = N.get('.detail__wrapper')
    this.d.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll(e) {
    console.log(e);
  }
}
