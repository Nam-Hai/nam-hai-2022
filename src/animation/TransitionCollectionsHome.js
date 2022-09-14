import { N } from "../utils/namhai";

export default class TransitionCollectionsHome {
  constructor({ cb, canvas, oldRoute, route }) {
    this.tl = new N.TL
    const m = N.get('.main'),
      mB = N.get('.buffer-main')

    mB.classList.add('buffer-main__DOWN')
    canvas.onChange('home')

    const collectionsMedias = canvas.collections.medias,
      boundsY = collectionsMedias[0].boundsPixel

    this.tl.from({
      d: 1000,
      e: 'io6',
      update: t => {
        N.T(m, 0, -t.progE * 100)
        N.T(mB, 0, -t.progE * 100)
        canvas.collections.group.position.y = canvas.size.height * t.progE
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
