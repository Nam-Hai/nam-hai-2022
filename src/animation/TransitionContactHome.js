import { N } from "../utils/namhai";

export default class TransitionContactHome {
  constructor({ cb, canvas, oldRoute, route }) {
    this.tl = new N.TL
    const m = N.get('main'),
      mB = N.get('.buffer-main')

    mB.classList.add('buffer-main__DOWN')
    canvas.onChange('home')

    const contact = canvas.contact,
      boundsY = contact.heroBoundsPixel

    this.tl.from({
      d: 1000,
      e: 'io6',
      update: t => {
        N.T(m, 0, -t.progE * 100)
        N.T(mB, 0, -t.progE * 100)
        canvas.contact.group.position.y = canvas.size.height * t.progE
        canvas.home.mesh.position.y = canvas.size.height * (-1 + t.progE)
      },
      cb: _ => {
        canvas.hide(oldRoute)
        cb()
      }
    })
  }
  play() {
    this.tl.play()
  }
}

