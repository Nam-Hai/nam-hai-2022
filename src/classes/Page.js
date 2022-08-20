import { N } from "../utils/namhai"

export default class Page {
  constructor({ elements, components, content, name }) {
    this.selectorChildren = elements
    this.components = components

    this.content = N.Cr('preloader')
    this.content.innerHTML = content
    this.create()
  }


  create() {
    this.elements = {};
    Object.entries(this.selectorChildren).forEach(([key, tag]) => {
      this.elements[key] = N.getAll(tag, this.content)
    })

    Object.entries(this.components).forEach(([key, componentType]) => {

      this.components[key] = [...N.getAll(key, this.content)].map(component => {

        return new componentType({ name: key, node: component })
      })
    })
  }

  render(nodeParent) {


    nodeParent.innerHTML = this.content.innerHTML

    Object.values(this.components).forEach((components) => {

      components.forEach(component => {
        // console.log('component current', component);
        // let nodeComponent = N.get(component.selector, nodeParent)
        component.render(nodeParent)
        component.addEventListener(nodeParent)
      })
    })

    // nodeParent.innerHTML = this.content.innerHTML
  }

  // querySelectRec(selectorObject) {
  //   let elements = {}
  //   for (const [key, entry] of Object.entries(selectorObject)) {
  //     if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
  //       elements[key] = entry;
  //     } else {
  //       let r;
  //       if (Object.prototype.toString.call(entry) === '[object Object]') r = this.querySelectRec(entry)
  //       else r = N.get(entry, this.element);
  //       elements[key] = r
  //     }
  //   }
  //   return elements
  // }


}
