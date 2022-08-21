import { N } from "../utils/namhai"

let id = 0
export default class Component {
  constructor({ name, content, node, input }) {


    this.input = input

    this.selector = `[data-id="${id}"]`


    this.element = N.Cr(name)
    this.element.innerHTML = content
    this.content = content

    this.element.setAttribute('data-id', id)
    node.setAttribute('data-id', id)
    this.computeInput(node)
    // this.create(element)

    id++
  }


  computeInput(node) {
    Object.entries(this.input).forEach(([attribute, value]) => {
      this[attribute] = node.getAttribute(attribute) || value
    })
  }

  create(selector) {
    this.element = selector instanceof window.HTMLElement ? selector : N.Select(selector);
  }

  render(node) {
    // console.log(this.selector);
    let proscedHTML = this.element.innerHTML
    this.element = N.get(this.selector, node)
    this.element.innerHTML = proscedHTML


  }

  addEventListener() {

  }

  removeEventListener() {

  }


}
