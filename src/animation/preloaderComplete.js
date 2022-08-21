import { N } from "../utils/namhai";

export default class preloaderComplete {
  constructor() {

    let button = N.get('.ressortButton')
    console.log(button);
    this.tl = new N.TL
    this.tl.from({
      d: 400,
      e: 'io5',
      update: t => {
        button.style.borderRadius = N.map(t.prog, 0, 1, 5, 0) + 'px'
      },
      cb: () => {
      }
    })
  }

  play() {
    this.tl.play()
  }


}
