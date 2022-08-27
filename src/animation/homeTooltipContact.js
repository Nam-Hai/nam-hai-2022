import { N } from "../utils/namhai";

export default class homeTooltipContact {
  constructor(b) {
    let button = N.get('main')
    this.tl = new N.TL
    this.tl.from({
      e: 'io5',
      update: t => {

      },
      cb: () => {
        button.style.backgroundColor = 'black'
      }
    })
  }
  play() {
    this.tl.play()
  }
}
