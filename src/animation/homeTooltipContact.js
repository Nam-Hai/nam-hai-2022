import { N } from "../utils/namhai";

export default class homeTooltipContact {
  constructor(b) {
    console.log('test2');
    let button = N.get('main')
    this.tl = new N.TL
    this.tl.from({
      e: 'io5',
      update: t => {

      },
      cb: () => {
        console.log('black');
        button.style.backgroundColor = 'black'
      }
    })
  }
  play() {
    this.tl.play()
  }
}
