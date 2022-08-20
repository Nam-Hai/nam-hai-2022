import Component from "../../classes/Component";
import { N } from "../../utils/namhai";
import content from './ressortButton.html?raw'

export default class ressortButton extends Component {
  constructor({ element }) {

    super({ element, content })

  }

  addEventListener() {
    let button = N.get('.ressortButton', this.element)
    console.log('addEventListener', this.element, button);
    this.element.addEventListener('click', () => {
      console.log('Click le bouton');
      button.style.backgroundColor = white
    })
    button.addEventListener('click', () => {
      console.log('ressort');
    })
  }

}
