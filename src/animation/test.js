import { N } from "../utils/namhai";

export default class test1 {
  constructor(b) {
    console.log('test1');
    let button = N.get('main')
    this.tl = new N.TL
    this.tl.from({
      d: 1000,
      e: 'io5',
      update: t => {

      },
      cb: () => {
        button.style.backgroundColor = 'red'
      }
    })
  }
  play() {
    this.tl.play()
  }
}
