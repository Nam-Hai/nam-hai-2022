import homeFixationInit from "../../animation/homeFixationInit";
import Page from "../../classes/Page";
import { N } from "../../utils/namhai";
import homeTemplate from "./home.html?raw"

export default class Home extends Page {
  constructor() {
    super({
      components: {
      },
      content: homeTemplate,
      name: 'home'
    })

  }

  render(node) {
    super.render(node)

    this.fixations = N.getAll('.fixation', node)
    let initMain = N.Ga(node, 'data-init')
    if (initMain) {
      console.log(this.fixations);
      let initAnimation = new homeFixationInit(this.fixations)
      initAnimation.play()
    }


  }
}
