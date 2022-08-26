import { canvas } from "../Canvas/canvas"
import { N } from "../utils/namhai"
import { stringLetterToDoubleSpan } from "../utils/utilsText"

const collectionsInfo = [
  { bg: '#171717', c: '#E5DFDF', flavour: 'IA', name: 'Midjourney' },
  { bg: '#F0BDBD', c: '#FF4A0B', flavour: 'Typography', name: 'Travis' },
  { bg: '#131721', c: '#DA2607', flavour: 'ia', name: 'midjourney' },

]

let currentPage = 0
export default class collectionsNext {
  constructor() {
    currentPage++
    this.canvas = canvas
    console.log(this.canvas.getCurrent());

    this.r = N.getAll('ressort-button')


    let bB = N.get('.buffer__background')
    bB.style.backgroundColor = collectionsInfo[currentPage].bg
    this.titleWrapperBuffer = N.get('.buffer__title')

    let navf = N.get('.true__title .nav__title__flavour')
    let navn = N.get('.true__title .nav__title__name')
    let navTitleNameSpans = N.getAll('.true__title .nav__title__name span span')
    let navTitleFlavourSpans = N.getAll('.true__title .nav__title__flavour span span')

    let navnB = N.get('.buffer__title .nav__title__name')
    let navfB = N.get('.buffer__title .nav__title__flavour')
    navnB.style.color = collectionsInfo[currentPage].c
    navfB.style.color = collectionsInfo[currentPage].c

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
      // update: t => {

      // },
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
        this.calculNextState(navf, navn, navfB, navnB)
      },
      e: 'o5',
      delay: 200
    })


  }

  calculNextState(navf, navn, navfB, navnB) {


    N.get('main').style.backgroundColor = collectionsInfo[currentPage].bg
    navf.innerHTML = navfB.innerHTML
    navn.innerHTML = navnB.innerHTML

    navf.style.color = collectionsInfo[currentPage].c
    navn.style.color = collectionsInfo[currentPage].c

    navfB.innerHTML = 'yo'
    navnB.innerHTML = 'testyo'

    N.O(this.titleWrapperBuffer, 0)
  }

  play() {
    this.r.forEach(r => {
      r.style.color = collectionsInfo[currentPage].c
      N.get('button', r).style.backgroundColor = collectionsInfo[currentPage].c
    })
    N.O(this.titleWrapperBuffer, 1)
    this.tl.play()
  }


}

