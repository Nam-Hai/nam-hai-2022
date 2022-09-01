import { N } from "../utils/namhai"

export default class collectionsTooltipBack {
  constructor(b) {
    this.tl = new N.TL
    let toolTip = N.getAll('.back__tooltip span span')
    const i = b ? 101 : 0,
      f = b ? 0 : 101

    this.tl.from({
      d: 450,
      el: [...toolTip],
      p: {
        x: [i, f]
      },
      e: 'o5'
    })
  }

}

