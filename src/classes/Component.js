import { N } from "../utils/namhai"

export default class Component {
  constructor({ element, content }) {
    this.element = element
    // this.elements = elements
    this.content = content
  }

  create(selector) {
    this.element = selector instanceof window.HTMLElement ? selector : N.Select(selector);
  }

  render() {
    this.element.innerHTML = this.content
  }

  addEventListener() {

  }

  removeEventListener() {

  }


}
