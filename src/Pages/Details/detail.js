import Page from "../../classes/Page";
import detailTemplate from './detail.html?raw'

export default class Detail extends Page {
  constructor() {
    super({
      content: detailTemplate,
      name: 'detail'
    })

  }
}
