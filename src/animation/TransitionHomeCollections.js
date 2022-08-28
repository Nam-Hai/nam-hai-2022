import { N } from "../utils/namhai";

export default class TransitionHomeCollections {
  constructor({ r, cb, canvas, oldRoute, route }) {
    this.tl = new N.TL
    this.r = r

    const m = N.get('main')
    const mB = N.get('.buffer-main')

    mB.classList.add('buffer-main__UP')
    // mB.setAttribute('data-template', 'collections')
    canvas.onChange('collections')
    const collectionsMedias = canvas.collections.medias
    this.tl.from({
      d: 1000,
      e: 'o5',
      update: (t) => {
        N.T(m, 0, t.progE * 100)
        N.T(mB, 0, t.progE * 100)
        collectionsMedias.forEach(m => {
          m.mesh.position.y = canvas.size.height * (1 - t.progE)

        });
        canvas.home.mesh.position.y = -canvas.home.canvasSize.height * t.progE
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
