import { canvas } from "../Canvas/canvas";
import { TEXTURE } from "../Canvas/Preloader/preloaderCanvas";
import { Texture } from 'ogl'
import { N } from "../utils/namhai";

class ContactService {
  constructor() {
    this.index = 0
    this.textures = ['contact/contact_1.png', 'contact/contact_2.png']
    this.info = [
      {
        texture: 'contact/contact_1.png',
        c: '#DF7863',
        bg: '#BD513A',
      },
      {
        texture: 'contact/contact_2.png',
        bg: "#2B2454",
        c: "#372F67"
      },
      {
        texture: 'contact/contact_3.png',
        bg: '#84133B',
        c: '#AE3560'
      }

    ]
  }

  next() {
    if (this.index + 1 == this.info.length) {
      this.index = -1
    }
    this.index++
  }

  getTexture() {
    return TEXTURE.get(this.textures[this.index])
  }

  getInfo() {
    return this.info[this.index]
  }
  getNextInfo() {
    if (this.index + 1 == this.info.length) {
      return this.info[0]
    }
    return this.info[this.index + 1]
  }

}
export const contactService = new ContactService()
export default class ContactAnimation {
  constructor(cb, wrapper, bgBuffer, contactTitle, contactTitleSpans, linkSpans, linkWrapper, backButton, gridFixation) {
    contactService.next()
    const nextColor = contactService.getInfo().c,
      nextBg = contactService.getInfo().bg

    const r = N.Rand.range(0, 20, 0.01)
    canvas.contact.program.uniforms.u_rand.value = r
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
      d: 400,
      e: 'i6',
      update: (t) => {
        canvas.contact.program.uniforms.u_ftime.value = 1 - t.progE
      },
      delay: 700
    })
    this.tl.from({
      el: [...contactTitleSpans, ...linkSpans],
      p: {
        x: [0, -105]
      },
      d: 450,
      e: 'o5',
      cb: _ => {
        linkWrapper.style.color = nextColor
        contactTitle.style.color = nextColor
      }
    })
    this.tl.from({
      el: [...contactTitleSpans, ...linkSpans],
      p: {
        x: [-105, 0]
      },
      d: 450,
      e: 'o5',
      delay: 1050
    })

    this.tl.from({
      d: 1,
      update: _ => { },
      delay: 700,
      cb: _ => {
        backButton.style.color = nextColor
        gridFixation.style.color = nextColor
      }
    })

    this.tl.from({
      el: bgBuffer,
      d: 400,
      p: {
        o: [0, 1]
      },
      e: 'i6',
      delay: 700,
      cb: _ => {

        wrapper.style.backgroundColor = nextBg
        bgBuffer.style.backgroundColor = contactService.getNextInfo().bg

        N.O(bgBuffer, 0)
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
        canvas.contact.texture.image = TEXTURE.get(contactService.getInfo().texture).image
        canvas.contact.textureBuffer.image = TEXTURE.get(contactService.getNextInfo().texture).image

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
