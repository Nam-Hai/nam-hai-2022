import Page from "../../classes/Page";
import ressortButton from "../../components/ressortButton/ressortButton";
import collectionsTemplate from './collections.html?raw'

export default class Collections extends Page {
  constructor() {
    super({
      components: {
        'ressort-button': ressortButton
      },
      content: collectionsTemplate,
      name: 'collections'
    })
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
  }
}
