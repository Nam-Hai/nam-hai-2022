import { TEXTURE } from "../Canvas/Preloader/PreloaderCanvas"

class CollectionsService {
  constructor() {
    this.currentPage = 0

    this.collectionsInfo = [
      {
        bg: '#171717', c: '#E5DFDF', image1: 'collections/noise1.png', image2: 'collections/noise2.png',
        flavour: '<span class="doublespan__container"><span class="tooltip__span">I</span></span><span class="doublespan__container"><span class="tooltip__span">A</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span">M</span></span><span class="doublespan__container"><span class="tooltip__span">i</span></span><span class="doublespan__container"><span class="tooltip__span">d</span></span><span class="doublespan__container"><span class="tooltip__span">j</span></span><span class="doublespan__container"><span class="tooltip__span">o</span></span><span class="doublespan__container"><span class="tooltip__span">u</span></span><span class="doublespan__container"><span class="tooltip__span">r</span></span><span class="doublespan__container"><span class="tooltip__span">n</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">y</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">1</span></span>'
      },
      {
        bg: '#F0BDBD', c: '#FF4A0B', image1: 'collections/travis1.png', image2: 'collections/travis2.png',
        flavour: '<span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >y</span></span><span class="doublespan__container"><span class="tooltip__span" >p</span></span><span class="doublespan__container"><span class="tooltip__span" >o</span></span><span class="doublespan__container"><span class="tooltip__span" >g</span></span><span class="doublespan__container"><span class="tooltip__span" >r</span></span><span class="doublespan__container"><span class="tooltip__span" >a</span></span><span class="doublespan__container"><span class="tooltip__span" >p</span></span><span class="doublespan__container"><span class="tooltip__span" >h</span></span><span class="doublespan__container"><span class="tooltip__span" >y</span></span></div>',
        name: '<div class="nav__title__name" ><span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >r</span></span><span class="doublespan__container"><span class="tooltip__span" >a</span></span><span class="doublespan__container"><span class="tooltip__span" >v</span></span><span class="doublespan__container"><span class="tooltip__span" >i</span></span><span class="doublespan__container"><span class="tooltip__span" >s</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">2</span></span>'
      },
      {
        bg: '#131721', c: '#DA2607', image1: 'collections/wrath1.png', image2: 'collections/wrath2.png',
        flavour: '<span class="doublespan__container"><span class="tooltip__span">I</span></span><span class="doublespan__container"><span class="tooltip__span">A</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span">M</span></span><span class="doublespan__container"><span class="tooltip__span">i</span></span><span class="doublespan__container"><span class="tooltip__span">d</span></span><span class="doublespan__container"><span class="tooltip__span">j</span></span><span class="doublespan__container"><span class="tooltip__span">o</span></span><span class="doublespan__container"><span class="tooltip__span">u</span></span><span class="doublespan__container"><span class="tooltip__span">r</span></span><span class="doublespan__container"><span class="tooltip__span">n</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">y</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">3</span></span>'
      },
      {
        bg: '#B2E8D7', c: '#1B795F', image1: 'collections/cherifkid1.jpg', image2: 'collections/cherifkid2.png',
        flavour: '<span class="doublespan__container"><span class="tooltip__span" >D</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >G</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >A</span></span><span class="doublespan__container"><span class="tooltip__span" >L</span></span><span class="doublespan__container"><span class="tooltip__span" >&nbsp;</span></span><span class="doublespan__container"><span class="tooltip__span" >P</span></span><span class="doublespan__container"><span class="tooltip__span" >A</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >N</span></span><span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >N</span></span><span class="doublespan__container"><span class="tooltip__span" >G</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span" >C</span></span><span class="doublespan__container"><span class="tooltip__span" >H</span></span><span class="doublespan__container"><span class="tooltip__span" >E</span></span><span class="doublespan__container"><span class="tooltip__span" >R</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >F</span></span><span class="doublespan__container"><span class="tooltip__span" >K</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >D</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">4</span></span>'
      },

    ]
  }
  increaseCounter() {
    this.currentPage++
    if (this.currentPage === this.collectionsInfo.length) this.currentPage = 0
  }
  decreaseCounter() {
    this.currentPage--
    if (this.currentPage === -1) this.currentPage = this.collectionsInfo.length - 1
  }

  getBufferImg(media, i) {
    const src = this.collectionsInfo[this.currentPage][`image${+i + 1}`]
    media.texture.image = TEXTURE.get(src).image
  }

  getInfo() {
    return this.collectionsInfo[this.currentPage]
  }
}
export const collectionsService = new CollectionsService();

