import { N } from "../utils/namhai";

export default class testAnimation {
  constructor(element) {

    this.tl = new N.TL
    this.tl.from({
      el: element,
      d: 300,
      p: {
        o: [1, 0]
      }
    })
  }

  play() {
    this.tl.play()
  }


}
