import { N } from "../utils/namhai";

export default class TransitionPreloaderHome {
  constructor({ r, cb, canvas, oldRoute, route }) {
    const mB = N.get('.buffer-main')

    mB.classList.add('buffer-main__cover')
    N.O(mB, 0)

    this.tl = new N.TL
    this.r = r

    const mesh = canvas.preloader.mesh,
      initX = mesh.scale.x,
      initY = mesh.scale.y,
      targetX = canvas.size.width,
      targetY = canvas.size.height;
    canvas.preloader.program.uniforms.o.value = 1

    this.tl.from({
      d: 1000,
      e: 'o6',
      update: t => {
        canvas.preloader.program.uniforms.fade.value = t.progE
        mesh.scale.x = N.Lerp(initX, targetX, t.progE)
        mesh.scale.y = N.Lerp(initY, targetY, t.progE)

        canvas.preloader.program.uniforms.radius.value = Math.max(canvas.preloader.buttonBounds.width, canvas.preloader.buttonBounds.height) * 4
        canvas.preloader.program.uniforms.force.value = N.Lerp(-3.5, 0, N.Ease.o3(t.prog))
        // canvas.preloader.program.uniforms.force.value = -2.5
      },
      cb: _ => {
        canvas.onChange(route)

        // canvas.preloader.program.uniforms.o.value = 0
        // cb()
      }
    })

    this.tl.from({
      el: mB,
      d: 500,
      p: {
        o: [0, 1]
      },
      delay: 1000,
      cb: _ => {
        canvas.hide(oldRoute)
        canvas.preloader.program.uniforms.o.value = 0
        cb()
      }
    })
  }

  play() {
    this.tl.play()
  }
}
