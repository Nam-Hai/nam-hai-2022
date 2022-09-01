import { canvas } from "../Canvas/canvas"
import { N } from "../utils/namhai"
import { stringLetterToDoubleSpan } from "../utils/utilsText"
import { collectionsService } from "./collectionsAnimationService"

export default class collectionsAnime {
  constructor() {
    this.button = N.get('.nR button')
    this.canvas = canvas

    const c = collectionsService.getInfo().c



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

    // stringLetterToDoubleSpan(navfB, 'tooltip__span')
    // stringLetterToDoubleSpan(navnB, 'tooltip__span')
    let navTitleFlavourBufferSpans = N.getAll('span span', navfB)
    let navTitleNameBufferSpans = N.getAll('span span', navnB)

    let backTooltip = N.get('.back__tooltip')
    backTooltip.style.color = c


    let page = N.get('.current__page'),
      pageSpan = N.getAll('span span', page)
    let pageBuffer = N.get('.buffer__page')
    pageBuffer.innerHTML = collectionsService.getInfo().index
    pageBuffer.style.color = collectionsService.getInfo().c

    let pageBufferSpans = N.getAll('span span', pageBuffer)
    let totalPage = N.get('.total__page'),
      totalPageSpan = N.getAll('span span', totalPage),
      totalPageBuffer = N.get('.total__page__buffer'),
      totalPageBufferSpans = N.getAll('span span', totalPageBuffer),
      total__page__wrapper = N.get('.total__page__wrapper')
    total__page__wrapper.style.color = c
    totalPageBuffer.style.color = c

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
      el: [...navTitleFlavourSpans, ...navTitleNameSpans, ...pageSpan, ...totalPageSpan],
      p: {
        x: [0, -101]
      },
      cb: _ => {
        N.O(pageBuffer, 1)
        N.O(totalPageBuffer, 1)
      },
      e: 'o5'
    })

    this.tl.from({
      d: 450,
      el: [...navTitleFlavourBufferSpans, ...navTitleNameBufferSpans, ...pageBufferSpans, ...totalPageBufferSpans
      ],
      p: {
        x: [-101, 0],
      },
      cb: () => {
        this.calculNextState(navf, navn, navfB, navnB, page, pageBuffer, totalPage, totalPageBuffer)
      },
      e: 'o5',
      delay: 450
    })

    N.PE.none(this.button)
    this.canvasAnimation()

  }

  calculNextState(navf, navn, navfB, navnB, p, bp, total__page, total__page__buffer) {
    total__page.innerHTML = total__page__buffer.innerHTML
    total__page.style.color = collectionsService.getInfo().c
    N.O(total__page__buffer, 0)

    p.innerHTML = bp.innerHTML
    p.style.color = collectionsService.getInfo().c

    N.O(bp, 0)
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

  canvasAnimation() {
  }


}

