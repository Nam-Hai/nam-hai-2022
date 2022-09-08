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

    N.BM(this, ['addEventListener'])
    this.tl = new N.TL
  }

  render(node) {
    super.render(node)
  }

  renderComponents(node) {
    super.renderComponents(node)

    this.linksWrapper = N.get('.contact__links', node)
    // this.addEventListener()

    let delay = new N.Delay(this.addEventListener, 2000).run()
  }

  addEventListener() {
    this.clickBool = false

    this.imageWrapper = N.get('.contact__container img', this.nodeParent)
    this.imageWrapper.addEventListener('click', async _ => {
      if (this.clickBool) return
      this.clickBool = true
      this.imageWrapper.classList.add('d-cursor')
      await canvas.contact.contactPelrinAnimation()
      this.imageWrapper.classList.remove('d-cursor')
      this.clickBool = false
    })

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
}
