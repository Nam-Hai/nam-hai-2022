import { N } from "../utils/namhai";

export default class test2 {
  constructor(b) {
    console.log('test2');
    let button = N.get('main')
    this.tl = new N.TL
    this.tl.from({
      e: 'io5',
      update: t => {

      },
      cb: () => {
        console.log('yoo');
        button.style.backgroundColor = 'black'
      }
    })
  }
  play() {
    this.tl.play()
  }
}
