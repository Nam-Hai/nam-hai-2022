import Component from "../../classes/Component";
import { N } from "../../utils/namhai";
import content from './ressortButton.html?raw'

export default class ressortButton extends Component {
  constructor({ name, node }) {

    // let color = N.Ga(node, 'color') || 'red'

    super({
      name, content, node,
      input: {
        color: 'red',
        rotate: 0
      }
    })
    this.isActivated = false

  }

  render() {
    super.render()

    this.button = N.get('button', this.element)
    // console.log(this.element, this.color, this.button);

    this.button.style.backgroundColor = this.color
    this.button.style.transform = `rotate(${this.rotate}deg)`

  }

  addEventListener(node) {
    this.button.addEventListener('click', () => {
      this.isActivated = !this.isActivated
      this.button.style.backgroundColor = this.isActivated ? 'white' : this.color
    })
  }

}
