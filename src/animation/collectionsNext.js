import { canvas } from "../Canvas/canvas"
import { N } from "../utils/namhai"
import { stringLetterToDoubleSpan } from "../utils/utilsText"

let currentPage = 0
export default class collectionsNext {
  constructor() {
    this.canvas = canvas
    console.log(this.canvas.getCurrent());

    let bB = N.get('.buffer__background')
    bB.style.backgroundColor = N.Ga(bB, 'data-color')
    this.titleWrapperBuffer = N.get('.buffer__title')

    let navf = N.get('.true__title .nav__title__flavour')
    let navn = N.get('.true__title .nav__title__name')
    let navTitleNameSpans = N.getAll('.true__title .nav__title__name span span')
    let navTitleFlavourSpans = N.getAll('.true__title .nav__title__flavour span span')

    let navnB = N.get('.buffer__title .nav__title__name')
    let navfB = N.get('.buffer__title .nav__title__flavour')

    stringLetterToDoubleSpan(navfB, 'tooltip__span')
    stringLetterToDoubleSpan(navnB, 'tooltip__span')
    let navTitleFlavourBufferSpans = N.getAll('span span', navfB)
    let navTitleNameBufferSpans = N.getAll('span span', navnB)


    this.tl = new N.TL
    this.tl.from({
      d: 1000,
      el: bB,
      p: {
        o: [0, 1]
      },
      e: 'io5',
    })

    this.tl.from({
      d: 450,
      el: [...navTitleFlavourSpans, ...navTitleNameSpans],
      p: {
        x: [0, -100]
      },
      e: 'o5'
    })

    this.tl.from({
      d: 450,
      el: [...navTitleFlavourBufferSpans, ...navTitleNameBufferSpans],
      p: {
        x: [-100, 0],
      },
      cb: () => {
        this.calculNextState(navf, navn, navfB, navnB, bB)
      },
      e: 'o5',
      delay: 200
    })


  }

  calculNextState(navf, navn, navfB, navnB, bB) {

    let a = N.get('main').style.backgroundColor = N.Ga(bB, 'data-color')
    bB.setAttribute('data-color', '#131721')
    navf.innerHTML = navfB.innerHTML
    navn.innerHTML = navnB.innerHTML

    navfB.innerHTML = 'yo'
    navnB.innerHTML = 'testyo'
    currentPage++
    N.O(this.titleWrapperBuffer, 0)
  }

  play() {
    N.O(this.titleWrapperBuffer, 1)
    this.tl.play()
  }


}

