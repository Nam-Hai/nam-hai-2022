import { N } from "../utils/namhai";

export default class test1 {
  constructor(b) {
    let link = N.get('a[href="collections"]', this.element)
    console.log(link);
    if (N.Ga(link, 'href')) {
      link.click()
    }
    console.log('test1');
    let button = N.get('main')
    this.tl = new N.TL
    this.tl.from({
      e: 'io5',
      update: t => {

      },
      cb: () => {
      }
    })
  }
  play() {
    this.tl.play()
  }
}
