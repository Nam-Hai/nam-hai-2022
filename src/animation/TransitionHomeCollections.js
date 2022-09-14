import { N } from "../utils/namhai";

export default class TransitionHomeCollections {
  constructor({ cb, canvas, oldRoute, route }) {
    this.tl = new N.TL
    const m = N.get('.main')
    const mB = N.get('.buffer-main')

    mB.classList.add('buffer-main__UP')
    // mB.setAttribute('data-template', 'collections')
    canvas.onChange('collections')
    const collectionsMedias = canvas.collections.medias

    const boundsY = collectionsMedias[0].boundsPixel
    this.tl.from({
      d: 1000,
      e: 'io6',
      update: (t) => {

        N.T(m, 0, t.progE * 100)
        N.T(mB, 0, t.progE * 100)
        collectionsMedias.forEach(m => {
          m.mesh.position.y = (-boundsY.y + canvas.sizePixel.height / 2) * canvas.size.height / canvas.sizePixel.height - m.bounds.height / 2
          m.mesh.position.y -= canvas.size.height * t.progE
        });
      },
      cb: _ => {
        canvas.hide(oldRoute)
        canvas.collections.getBounds()
        cb()
      }
    })
  }

  play() {
    this.tl.play()
  }
}
