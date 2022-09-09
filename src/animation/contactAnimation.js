import { canvas } from "../Canvas/canvas";
import { N } from "../utils/namhai";

export default class ContactAnimation {
  constructor(cb, wrapper, bgBuffer) {
    const r = N.Rand.range(0, 20, 0.01)
    canvas.contact.program.uniforms.u_rand.value = r
    // this.tl.pause()
    canvas.contact.program.uniforms.u_time.value = 0;
    canvas.contact.program.uniforms.u_force.value = 0;
    this.tl = new N.TL
    this.tl.from({
      d: 700,
      e: 'o2',
      update: (t) => {
        canvas.contact.program.uniforms.u_ftime.value = t.progE
      }
    })
    this.tl.from({
      d: 500,
      e: 'i6',
      update: (t) => {
        canvas.contact.program.uniforms.u_ftime.value = 1 - t.progE
      },
      delay: 700
    })
    this.tl.from({
      el: bgBuffer,
      d: 1000,
      p: {
        o: [0, 1]
      }
    })

    this.tl.from({
      d: 1500,
      update: t => {
        canvas.contact.program.uniforms.u_time.value = t.progE
      },
      cb: _ => {
        canvas.contact.program.uniforms.u_time.value = 0;
        canvas.contact.program.uniforms.u_force.value = 0;
        // this.texture = this.textureBuffer
        [canvas.contact.texture, canvas.contact.textureBuffer] = [canvas.contact.textureBuffer, canvas.contact.texture]
        canvas.contact.program.uniforms.tMap.value = canvas.contact.texture;
        canvas.contact.program.uniforms.tMapBuffer.value = canvas.contact.textureBuffer;

        cb()
      }
    })
    this.tl.from({
      d: 500,
      delay: 1000,
      e: 'linear',
      update: t => {
        canvas.contact.program.uniforms.u_force.value = t.progE
      }
    })
  }
  play() {
    this.tl.play()
  }
}
