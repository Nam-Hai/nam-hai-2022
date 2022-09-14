import { N } from "../utils/namhai";

export default class TransitionHomeContact {
  constructor({ cb, canvas, oldRoute, route }) {
    this.tl = new N.TL
    const m = N.get('.main')
    const mB = N.get('.buffer-main')

    mB.classList.add('buffer-main__UP')
    canvas.onChange('contact')
    const contact = canvas.contact
    const boundsY = contact.heroBoundsPixel

    this.tl.from({
      d: 1000,
      e: 'io6',
      update: (t) => {

        N.T(m, 0, t.progE * 100)
        N.T(mB, 0, t.progE * 100)
        contact.mesh.position.y = (-boundsY.y + canvas.sizePixel.height / 2) * canvas.size.height / canvas.sizePixel.height - contact.heroBounds.height / 2
        contact.mesh.position.y -= canvas.size.height * t.progE
        // canvas.home.mesh.position.y = -canvas.size.height * t.progE
      },
      cb: _ => {
        canvas.hide(oldRoute)
        canvas.contact.getBounds()
        cb()
      }
    })
  }

  play() {
    this.tl.play()
  }
}
