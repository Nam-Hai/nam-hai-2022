import { N } from "../utils/namhai"

export default class Page {
  constructor({ elements, components, content, name }) {
    this.selectorChildren = elements
    this.components = components

    this.content = N.Cr(name)
    this.name = name
    this.content.innerHTML = content

    this.create()
  }


  create() {
    this.elements = {};

    if (!this.components) return
    Object.entries(this.components).forEach(([key, componentType]) => {

      this.components[key] = [...N.getAll(key, this.content)].map(component => {
        return new componentType({ name: key, node: component })
      })
    })
  }

  render(nodeParent) {


    nodeParent.innerHTML = this.content.innerHTML
    nodeParent.setAttribute('style', '')
    nodeParent.setAttribute('data-template', this.name)

    if (this.components) {
      Object.values(this.components).forEach((components) => {

        components.forEach(component => {
          component.render(nodeParent)
          component.addEventListener()
        })
      })

    }
    this.nodeParent = nodeParent

  }

  onMouseDown(e) {

  }

  onMouseMove(e) {

  }
  onMouseUp(e) {

  }

  async hide() {
    // return new Promise(res => {
    //   let motion = new N.M({
    //     el: this.nodeParent,
    //     p: {
    //       o: [1, 0]
    //     },
    //     d: 1000,
    //     cb: () => {
    //       res()
    //     }
    //   })
    //   motion.play()
    // })

  }
}
