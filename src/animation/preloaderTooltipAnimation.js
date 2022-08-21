import { N } from "../utils/namhai";

export default class PreloaderTooltipAnimation {
  constructor(b) {

    let tooltip = N.get('.ressort__demo__tooltip')
    let succes = N.get('.ressort__demo__success')
    this.tl = new N.TL

    let tooltipO = {
      o: b ? [1, 0] : [0, 1],
      delay: b ? 0 : 200
    }

    let successO = {
      o: b ? [0, 1] : [1, 0],
      delay: b ? 200 : 0
    }
    this.tl.from({
      el: tooltip,
      p: {
        o: tooltipO.o
      },
      d: 450,
      e: 'o5',
      delay: tooltipO.delay
    })

    this.tl.from({
      el: succes,
      p: {
        o: successO.o
      },
      d: 450,
      e: 'o5',
      delay: successO.delay
    })


  }

  play() {
    this.tl.play()
  }


}

