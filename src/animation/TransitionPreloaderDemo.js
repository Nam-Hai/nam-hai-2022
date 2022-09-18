import { N } from "../utils/namhai";

export default class TransitionPreloaderDemo {
  constructor({ cb, canvas, oldRoute, route }) {
    const button = N.get('ressort-button'),
      bFixation = N.get('a > div > svg', button),
      size = canvas.sizePixel,
      mB = N.get('.buffer-main'),
      tooltipSpans = N.getAll('.ressort__demo__tooltip__wrapper span span'),
      preloaderBar = N.get('.preloader__bar');
    preloaderBar.style.transition = 'unset'
    Object.values(tooltipSpans).map(s => N.T(s, 105, 0))
    mB.classList.add('buffer-main__cover')
    N.O(bFixation, 0)
    this.tl = new N.TL

    N.T(button, 0, 0.5 * size.height + 3.5 * 16, 'px')
    this.tl.from({
      el: preloaderBar,
      e: 'i3',
      p: {
        scaleX: [3, 2]
      },
      d: 400,
    })
    this.tl.from({
      d: 1000,
      el: button,
      e: 'io5',
      p: {
        y: [0.5 * size.height + 3.5 * 16, 0, 'px']
      },
    })
    this.tl.from({
      el: N.getAll('.ressort__demo__tooltip span span'),
      d: 450,
      e: 'o5',
      p: {
        x: [105, 0]
      },
      delay: 800,
    })
    this.tl.from({
      el: bFixation,
      d: 500,
      e: 'o5',
      p: {
        rotateZ: [180, 0],
        o: [0, 1]
      },
      delay: 700,
      cb: _ => {
        canvas.onChange(route)
        canvas.hide(oldRoute)
        cb()
      }
    })
  }

  play() {
    this.tl.play()
  }

}
