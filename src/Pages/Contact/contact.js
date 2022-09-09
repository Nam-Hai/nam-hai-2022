import ContactAnimation from "../../animation/contactAnimation";
import homeFixation from "../../animation/homeFixation";
import { canvas } from "../../Canvas/canvas";
import Page from "../../classes/Page";
import gridFixation from "../../components/gridFixation/gridFixation";
import ressortButton from "../../components/ressortButton/ressortButton";
import { N } from "../../utils/namhai";
import contactTemplate from './contact.html?raw'


export default class Contact extends Page {
  constructor() {
    super({
      components: {
        'grid-fixation': gridFixation,
        'ressort-button': ressortButton
      },
      content: contactTemplate,
      name: 'contact'
    })

    N.BM(this, ['addClickEvent'])
    this.tl = new N.TL
    this.iRaf = new N.RafR(_ => {
      if (canvas.contact && !canvas.contact.init) return
      this.addClickEvent()
      this.iRaf.stop()
      this.iRaf = null
    })
  }

  render(node) {
    super.render(node)
  }

  renderComponents(node) {
    super.renderComponents(node)

    this.imageWrapper = N.get('.contact__container img', node)
    this.linksWrapper = N.get('.contact__links', node)
    this.addEventListener()


    this.iRaf.run()
  }

  addClickEvent() {
    this.clickBool = false

    this.imageWrapper.addEventListener('click', async _ => {
      if (this.clickBool) return
      this.clickBool = true
      this.imageWrapper.classList.add('d-cursor')

      const cA = new ContactAnimation
      cA.play()
      // await canvas.contact.contactPelrinAnimation()
      this.imageWrapper.classList.remove('d-cursor')
      this.clickBool = false
    })
  }
  addEventListener() {

    Object.values([this.linksWrapper, this.imageWrapper]).forEach(a => {

      a.addEventListener('mouseenter', _ => {
        this.tl.pause()
        this.tl = (new homeFixation()).tl
        this.tl.play()
      })
      a.addEventListener('mouseleave', _ => {
        this.tl.pause()
        this.tl = (new homeFixation(true)).tl
        this.tl.play()
      })
    })
  }
  onMouseMove(e) {
    this.components['ressort-button'].forEach(c => {
      c.onMouseMove(e)
    })
  }
  onMouseUp(e) {
    this.components['ressort-button'].forEach(c => {
      c.onMouseUp(e)
    })
  }

  hide() {
    if (this.iRaf) this.iRaf.stop()
  }
}
