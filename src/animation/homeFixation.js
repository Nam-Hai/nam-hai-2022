import { N } from "../utils/namhai";

const indexToDelay = [0, 1, 2, 3, 3, 2, 1, 0]
let fixationState = false
export default class homeFixation {
  constructor(b) {
    this.tl = new N.TL
    if (b === undefined) {
      b = false
    }
    let fixations = N.getAll('grid-fixation div')

    Object.entries(fixations).forEach(([index, fixation]) => {
      const initX = -(8 + 7 * 21) + 42 * index + 2 * (index - 1),
        endX = -(8 + 7 * 48) + 96 * index + 2 * (index - 1);


      this.tl.from({
        d: 500,
        p: {
          x: [fixationState == b ? initX : b ? initX : endX, b ? endX : initX, 'px']
        },
        el: fixation,
        e: 'io5',
      })
    })
    fixationState = b

    // this.play()
  }

  play() {
    this.tl.play()
  }


}
