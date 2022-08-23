import { N } from "../utils/namhai";

const indexToDelay = [0, 1, 2, 3, 3, 2, 1, 0]

export default class homeFixationInit {
  constructor(fixations) {

    this.tl = new N.TL
    console.log(fixations);
    Object.entries(fixations).forEach(([index, fixation]) => {
      this.tl.from({
        d: 1500,
        p: {
          x: [0, -(8 + 7 * 21) + 42 * index + 2 * (index - 1), 'px']
        },
        el: fixation,
        delay: indexToDelay[index] * 200,
        e: 'io5',
      })
    })
  }

  play() {
    this.tl.play()
  }


}

