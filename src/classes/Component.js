import { N } from "../utils/namhai"

let id = 0
export default class Component {
  constructor({ name, content, node }) {
    this.selector = `[data-id="${id}"]`

    this.element = N.Cr(name)
    console.log(this.element, name);
    this.element.innerHTML = content
    this.content = content

    this.element.setAttribute('data-id', id)
    node.setAttribute('data-id', id)
    // this.create(element)

    id++
  }

  create(selector) {
    this.element = selector instanceof window.HTMLElement ? selector : N.Select(selector);
  }

  render(node) {
    // console.log(this.selector);
    this.element = N.get(this.selector, node)
    this.element.innerHTML = this.content
    console.log(this.element, node, this.selector);


  }

  addEventListener() {

  }

  removeEventListener() {

  }


}
