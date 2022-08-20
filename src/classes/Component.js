import { N } from "../utils/namhai"


export default class Component {
  constructor({ element, content }) {
    this.element = element
    // this.elements = elements
    this.content = content

    this.render()
    this.create(element)
  }

  create(selector) {
    this.element = selector instanceof window.HTMLElement ? selector : N.Select(selector);
    console.log(selector, this.element);
  }

  render() {
    console.log(this.element, this.content);
    this.element.innerHTML = this.content
  }

  addEventListener() {

  }

  removeEventListener() {

  }


}
