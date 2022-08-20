import Component from "../../classes/Component";
import { N } from "../../utils/namhai";
import content from './ressortButton.html?raw'

export default class ressortButton extends Component {
  constructor({ name, node }) {

    super({ name, content, node })

  }
  // render() {
  //   super.render()
  // }

  addEventListener(node) {
    let button = N.get('.ressortButton', this.element)
    button.addEventListener('click', () => {
      button.style.backgroundColor = 'white'
    })
  }

}
