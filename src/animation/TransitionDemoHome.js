import { N } from "../utils/namhai";

export default class TransitionDemoHome {
  constructor({ r, cb, canvas, oldRoute, route }) {

    const mB = N.get('.buffer-main'),
      homeWB = N.get('.home__wrapper', mB)
    mB.classList.add('buffer-main__cover')
    N.O(mB, 0)
    N.O(homeWB, 0)
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
        N.O(mB, 1)
        // cb()
      }
    })
    this.tl.from({
      delay: 500,
      d: 1000,
      el: homeWB,
      p: {
        o: [0, 1]
      },
      cb: _ => cb()
    })
  }

  play() {
    this.tl.play()
  }
}
