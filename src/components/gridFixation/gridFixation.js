import content from './gridFixation.html?raw';
import Component from "../../classes/Component";
import { N } from "../../utils/namhai";
import homeFixationInit from "../../animation/homeFixationInit";

export default class gridFixation extends Component {
  constructor({ name, node }) {
    super({
      name, content, node,
      input: {

      }
    })

  }

  render(node) {
    super.render()

    this.fixations = N.getAll('.fixation', node)
    // let initMain = N.Ga(node, 'data-init')
    // if (initMain) {
    let initAnimation = new homeFixationInit(this.fixations)
    initAnimation.play()
    // }
  }
}
