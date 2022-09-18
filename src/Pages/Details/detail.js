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

    this.addEventListener()
  }
  addEventListener() {
    this.d = N.get('.detail__wrapper')
    this.d.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll(e) {
    // N.PD(e)
    console.log(e);

    // this.d.scrollTo(0, 0)
  }
}
