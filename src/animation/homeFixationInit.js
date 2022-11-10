import { N } from "../utils/namhai";

const indexToDelay = [0, 1, 2, 3, 3, 2, 1, 0]
export var fixationInit = false
export default class homeFixationInit {
  constructor(fixations) {

    this.tl = new N.TL
    if (!fixationInit) {

      Object.entries(fixations).forEach(([index, fixation]) => {
        this.tl.from({
          d: 800,
          p: {
            // x: [0, -(8 + 7 * 21) + 42 * index + 2 * (index - 1), 'px']
            x: [0, -(8 + 7 * 48) + 96 * index + 2 * (index - 1), 'px']
          },
          cb: _ => fixationInit = true,
          el: fixation,
          delay: indexToDelay[index] * 10 + 1600,
          e: 'io5',
        })
      })
    } else {
      Object.entries(fixations).forEach(([index, fixation]) => {
        N.T(fixation, -(8 + 7 * 48) + 96 * index + 2 * (index - 1), 0, 'px')
      })
    }
  }

  play() {
    this.tl.play()
  }


}

