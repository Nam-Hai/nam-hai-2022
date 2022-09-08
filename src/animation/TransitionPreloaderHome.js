import { N } from "../utils/namhai";

export default class TransitionPreloaderHome {
  constructor({ r, cb, canvas, oldRoute, route }) {

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
        mesh.scale.x = N.Lerp(initX, targetX, t.progE)
        mesh.scale.y = N.Lerp(initY, targetY, t.progE)

        canvas.preloader.program.uniforms.radius.value = Math.max(canvas.preloader.buttonBounds.width, canvas.preloader.buttonBounds.height) * 4
        canvas.preloader.program.uniforms.force.value = N.Lerp(-3.5, 0, N.Ease.o3(t.prog))
        // canvas.preloader.program.uniforms.force.value = -2.5
      },
      cb: _ => {
        canvas.preloader.program.uniforms.o.value = 0
        canvas.hide(oldRoute)
        canvas.onChange(route)
        cb()
      }
    })
  }

  play() {
    this.tl.play()
  }
}
