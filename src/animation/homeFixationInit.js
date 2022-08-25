import { N } from "../utils/namhai";

const indexToDelay = [0, 1, 2, 3, 3, 2, 1, 0]
// export var fixationInit = false
export default class homeFixationInit {
  constructor(fixations) {

    this.tl = new N.TL
    Object.entries(fixations).forEach(([index, fixation]) => {
      this.tl.from({
        d: 800,
        p: {
          x: [0, -(8 + 7 * 21) + 42 * index + 2 * (index - 1), 'px']
        },
        // cb: t => fixationInit = true,
        el: fixation,
        delay: indexToDelay[index] * 0,
        e: 'io5',
      })
    })
  }

  play() {
    this.tl.play()
  }


}

