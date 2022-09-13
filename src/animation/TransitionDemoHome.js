import { N } from "../utils/namhai";

export default class TransitionDemoHome {
  constructor({ r, cb, canvas, oldRoute, route }) {

    const mB = N.get('.buffer-main')
    mB.classList.add('buffer-main__cover')
    this.tl = new N.TL
    this.r = r

    const mesh = canvas.demo.mesh,
      initX = mesh.scale.x,
      initY = mesh.scale.y,
      targetX = canvas.size.width,
      targetY = canvas.size.height;
    canvas.demo.program.uniforms.o.value = 1

    this.tl.from({
      d: 1000,
      e: 'o6',
      update: t => {
        mesh.scale.x = N.Lerp(initX, targetX, t.progE)
        mesh.scale.y = N.Lerp(initY, targetY, t.progE)

        canvas.demo.program.uniforms.radius.value = Math.max(canvas.demo.buttonBounds.width, canvas.demo.buttonBounds.height) * 4
        canvas.demo.program.uniforms.force.value = N.Lerp(-3.5, 0, N.Ease.o3(t.prog))
        // canvas.demo.program.uniforms.force.value = -2.5
      },
      cb: _ => {
        canvas.onChange(route)
        canvas.demo.program.uniforms.o.value = 0
        canvas.hide(oldRoute)
        // cb()
      }
    })
    this.tl.from({
      delay: 1000,
      d: 5000,
      el: N.get('.home__wrapper', mB),
      p: {
        o: [0, 1]
      },

      cb: _ => cb()
    })
    // this.tl.from({
    //   d: 500,
    //   delay: 1000,
    //   update: t => {
    //     canvas.demo.program.uniforms.o.value = 1 - t.progE
    //   },
    //   cb: _ => {
    //     canvas.hide(oldRoute)
    //   }

    // })
  }

  play() {
    this.tl.play()
  }
}
