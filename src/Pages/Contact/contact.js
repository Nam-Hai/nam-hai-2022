import homeFixation from "../../animation/homeFixation";
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

    this.tl = new N.TL
  }

  render(node) {
    super.render(node)
  }

  renderComponents(node) {
    super.renderComponents(node)

    this.linksWrapper = N.get('.contact__links', node)
    this.addEventListener()
  }

  addEventListener() {

    this.linksWrapper.addEventListener('mouseenter', _ => {
      this.tl.pause()
      this.tl = (new homeFixation()).tl
      this.tl.play()
    })
    this.linksWrapper.addEventListener('mouseleave', _ => {
      this.tl.pause()
      this.tl = (new homeFixation(true)).tl
      this.tl.play()
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
