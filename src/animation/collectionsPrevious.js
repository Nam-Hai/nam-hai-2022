import { canvas } from "../Canvas/canvas";
import { N } from "../utils/namhai";
import collectionsAnime, { collectionsService } from "./collectionsAnimation";

export default class collectionsPrevious extends collectionsAnime {
  constructor() {
    collectionsService.decreaseCounter()
    super()
  }

  canvasAnimation() {
    const d = 600, delay = 1000, e = 'io5', zF = -0.5
    const force = -1.5
    this.canvas = canvas
    Object.entries(this.canvas.collections.mediasBuffer).forEach(([index, mB]) => {
      collectionsService.getBufferImg(mB, index)
    })
    let mediasBuffer = this.canvas.collections.mediasBuffer
    const mB = mediasBuffer[0], mB2 = mediasBuffer[1]
    let medias = this.canvas.collections.medias

    let m2 = medias[1]
    let m = medias[0]

    mB.mesh.scale.x = 0
    mB2.mesh.scale.x = 0

    this.tl.from({
      d: d,
      e: 'i2',
      update: (t) => {

        if (t.prog < .3) {

          m.program.uniforms.force.value = N.map(t.prog, 0, 0.3, 0, force)
          mB.program.uniforms.force.value = N.map(t.prog, 0, 0.3, 0, force)
          m2.program.uniforms.force.value = N.map(t.prog, 0, 0.3, 0, force)
          mB2.program.uniforms.force.value = N.map(t.prog, 0, 0.3, 0, force)
        }
        [...medias, ...mediasBuffer].forEach(m => {
          m.program.uniforms.target.value = m.canvasSize.width * (-.5 + t.progE / 2)
        })
        let nT = N.Clamp(N.iLerp(t.progE, 0.3, 1), 0, 1)
        m.mesh.scale.x = m.bounds.width * (1 - nT)
        m.mesh.position.x = (m.boundsPixel.x - m.canvasSizePixel.width / 2) * m.canvasSize.width / m.canvasSizePixel.width + m.bounds.width * (nT + 1) / 2

        m.program.uniforms.s.value = [1 / (1 - nT), 1]
        m.program.uniforms.t.value = [nT / 2, 0]

        mB.mesh.scale.x = mB.bounds.width * nT
        mB.mesh.position.x = (mB.boundsPixel.x - mB.canvasSizePixel.width / 2) * mB.canvasSize.width / mB.canvasSizePixel.width + mB.bounds.width * (nT) / 2

        mB.program.uniforms.s.value = [1 / nT, 1]
        mB.program.uniforms.t.value = [-.5 + nT / 2, 0]

      },
    })
    this.tl.from({
      delay: d,
      d: d,
      e: 'o2',
      update: (t) => {
        [...medias, ...mediasBuffer].forEach(m => {
          m.program.uniforms.target.value = m.canvasSize.width * (-.5 + (1 + t.progE) / 2)
        })
        let nT = N.Clamp(N.iLerp(t.progE, 0, 0.8), 0, 1)
        m2.mesh.scale.x = m2.bounds.width * (1 - nT)
        m2.mesh.position.x = (m2.boundsPixel.x - m2.canvasSizePixel.width / 2) * m2.canvasSize.width / m2.canvasSizePixel.width + m2.bounds.width * (1 + nT) / 2

        m2.program.uniforms.s.value = [1 / (1 - nT), 1]
        m2.program.uniforms.t.value = [nT / 2, 0]
        mB2.mesh.scale.x = mB2.bounds.width * nT
        mB2.mesh.position.x = (mB2.boundsPixel.x - mB2.canvasSizePixel.width / 2) * mB2.canvasSize.width / mB2.canvasSizePixel.width + mB2.bounds.width * (nT) / 2

        mB2.program.uniforms.s.value = [1 / nT, 1]
        mB2.program.uniforms.t.value = [-0.5 + nT / 2, 0]


        if (t.prog > .7) {

          m.program.uniforms.force.value = N.map(t.prog, 0.7, 1, force, 0)
          mB.program.uniforms.force.value = N.map(t.prog, 0.7, 1, force, 0)
          m2.program.uniforms.force.value = N.map(t.prog, 0.7, 1, force, 0)
          mB2.program.uniforms.force.value = N.map(t.prog, 0.7, 1, force, 0)
        }
      },
      cb: _ => {
        m.texture.image = mB.texture.image
        m2.texture.image = mB2.texture.image
        m.setScale()
        m2.setScale()
        mB.mesh.scale.x = 0
        mB2.mesh.scale.x = 0

        N.PE.all(this.button)
      }
    })

  }


}
