import { canvas } from "../Canvas/canvas"
import { N } from "../utils/namhai"
import { stringLetterToDoubleSpan } from "../utils/utilsText"

class CollectionsService {
  constructor() {
    this.currentPage = 0

    this.collectionsInfo = [
      { bg: '#171717', c: '#E5DFDF', flavour: 'IA', name: 'Midjourney' },
      { bg: '#F0BDBD', c: '#FF4A0B', flavour: 'Typography', name: 'Travis' },
      { bg: '#131721', c: '#DA2607', flavour: 'ia', name: 'midjourney' },
      { bg: '#171717', c: '#E5DFDF', flavour: 'IA', name: 'Midjourney' },

    ]
  }
  increaseCounter() {
    this.currentPage++
    if (this.currentPage === this.collectionsInfo.length - 1) this.currentPage = 0
  }

  getInfo() {
    return this.collectionsInfo[this.currentPage]
  }
}
export const collectionsService = new CollectionsService();

export default class collectionsNext {
  constructor() {
    collectionsService.increaseCounter()
    this.canvas = canvas



    let bB = N.get('.buffer__background')
    bB.style.backgroundColor = collectionsService.getInfo().bg
    this.titleWrapperBuffer = N.get('.buffer__title')

    let navf = N.get('.true__title .nav__title__flavour')
    let navn = N.get('.true__title .nav__title__name')
    let navTitleNameSpans = N.getAll('.true__title .nav__title__name span span')
    let navTitleFlavourSpans = N.getAll('.true__title .nav__title__flavour span span')

    let navnB = N.get('.buffer__title .nav__title__name')
    let navfB = N.get('.buffer__title .nav__title__flavour')
    navnB.innerHTML = collectionsService.getInfo().name
    navfB.innerHTML = collectionsService.getInfo().flavour
    navnB.style.color = collectionsService.getInfo().c
    navfB.style.color = collectionsService.getInfo().c

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


    N.get('main').style.backgroundColor = collectionsService.getInfo().bg
    navf.innerHTML = navfB.innerHTML
    navn.innerHTML = navnB.innerHTML

    navf.style.color = collectionsService.getInfo().c
    navn.style.color = collectionsService.getInfo().c
    N.O(this.titleWrapperBuffer, 0)
  }

  play() {
    const fixations = N.getAll('.fixation')
    fixations.forEach(f => {
      f.style.backgroundColor = collectionsService.getInfo().c
    })

    const ressorts = N.getAll('ressort-button')
    ressorts.forEach(r => {
      r.style.color = collectionsService.getInfo().c
      N.get('button', r).style.backgroundColor = collectionsService.getInfo().c
    })
    N.O(this.titleWrapperBuffer, 1)
    this.tl.play()
  }


}

