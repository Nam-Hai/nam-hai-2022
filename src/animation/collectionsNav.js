import { N } from "../utils/namhai";

export default class collectionsNav {
  constructor() {
    let link = N.get('a[href="home"]', this.element)
    if (N.Ga(link, 'href')) {
      link.click()
    }
    // this.tl = new N.TL

    // console.log(pageSpan, pageBufferSpans);
    // this.tl.from({
    //   d: 450,
    //   el: [...pageSpan],
    //   p: {
    //     x: [0, -101]
    //   },
    //   e: 'o5'
    // })

    // this.tl.from({
    //   d: 450,
    //   el: [...pageBufferSpans
    //   ],
    //   p: {
    //     x: [-101, 0],
    //   },
    //   cb: () => {
    //     this.calculNextState(pageBuffer, page)
    //   },
    //   e: 'o5',
    //   delay: 450
    // })
  }

  play() {
  }


}

