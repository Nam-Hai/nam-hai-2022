import { N } from "../utils/namhai";
import homeFixation from "./homeFixation";


const line1ToIndex = [0, 1, 4, 5, 6, 9, 13, 14]
let currentState = 0
export default class homeTextTransform {
  constructor() {
    const stateToAnimiation = [this.firstAnimation.bind(this), this.secondAnimation.bind(this), this.thirdAnimation.bind(this)]
    this.tl = new N.TL

    if (currentState == 3) currentState = 0

    stateToAnimiation[currentState]()


    currentState++
  }

  firstAnimation() {
    let lines = N.getAll('.title-line')
    for (let [lineIndex, line] of Object.entries(lines)) {
      let letters = N.getAll('.singlespan__container', line)

      Object.entries(letters).forEach(([index, letter]) => {
        const newIndex = lineIndex == 0 ? line1ToIndex[index] : index,
          newLength = lineIndex == 0 ? line1ToIndex[letters.length - 1] + 1 : letters.length
        const initX = 1.195 * (letters.length - index),
          endX = -2.405 * (newLength - newIndex);

        this.tl.from({
          d: 500,
          p: {
            x: [initX, endX, 'rem']
          },
          el: letter,
          delay: index * 20,
          e: 'io5',
        })
      })
    }
  }

  secondAnimation() {
    let lines = N.getAll('.title-line')
    for (let [lineIndex, line] of Object.entries(lines)) {
      let letters = N.getAll('.singlespan__container', line)

      Object.entries(letters).forEach(([index, letter]) => {
        if (lineIndex == 0) {
          const oldIndex = line1ToIndex[index]
          const endX = 1.1 * (letters.length - index) - 40,
            initX = -2.405 * (15 - oldIndex);

          this.tl.from({
            d: 500,
            p: {
              x: [initX, endX, 'rem']
            },
            el: letter,
            delay: index * 20,
            e: 'io5',
          })
        } else {
          const initX = -2.405 * (letters.length - index),
            endX = -1.035 * (letters.length - index) + 18;
          this.tl.from({
            d: 500,
            p: {
              x: [initX, endX, 'rem'],
              y: [0, 25, 'rem']
            },
            el: letter,
            delay: index * 20,
            e: 'io5',
          })
        }

      })
    }
  }
  thirdAnimation() {
    let lines = N.getAll('.title-line')
    for (let [lineIndex, line] of Object.entries(lines)) {
      let letters = N.getAll('.singlespan__container', line)

      Object.entries(letters).forEach(([index, letter]) => {
        const endX = 1.195 * (letters.length - index)
        if (lineIndex == 0) {
          const initX = 1.1 * (letters.length - index) - 40

          this.tl.from({
            d: 500,
            p: {
              x: [initX, endX, 'rem']
            },
            el: letter,
            delay: index * 20,
            e: 'io5',
          })
        } else {
          const initX = -1.035 * (letters.length - index) + 18;
          this.tl.from({
            d: 500,
            p: {
              x: [initX, endX, 'rem'],
              y: [25, 0, 'rem']
            },
            el: letter,
            delay: index * 20,
            e: 'io5',
          })
        }

      })
    }
  }

  play() {
    this.tl.play()
  }


}

