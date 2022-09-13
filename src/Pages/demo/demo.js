import Page from "../../classes/Page"
import ressortButton from "../../components/ressortButton/ressortButton"
import demoTemplate from "./demo.html?raw"
import { N } from "../../utils/namhai";

export default class Demo extends Page {
  constructor() {

    super({
      components: {
        'ressort-button': ressortButton
      },
      content: demoTemplate,
      name: 'demo'
    })

  }

  render(node) {
    super.render(node)

  }

  renderComponents(node) {
    super.renderComponents(node)

    new N.M({
      el: node,
      d: 600,
      p: {
        o: [0, 1]
      }
    }).play()
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

  async hide() {
    this.ressort = this.components['ressort-button'][0]
    await new Promise(res => {
      let raf = new N.RafR(() => {
        if (this.ressort.end) {
          res()
          raf.stop()
        }
      })
      raf.run()
    })
  }
}
