import { TEXTURE } from "../Canvas/Preloader/preloaderCanvas"

class CollectionsService {
  constructor() {
    this.currentPage = 2

    this.collectionsInfo = [
      {
        bg: '#171717', c: '#E5DFDF', image1: 'collections/noise1.png', image2: 'collections/noise2.png',
        flavour: '<span class="doublespan__container"><span class="tooltip__span">I</span></span><span class="doublespan__container"><span class="tooltip__span">A</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span">M</span></span><span class="doublespan__container"><span class="tooltip__span">i</span></span><span class="doublespan__container"><span class="tooltip__span">d</span></span><span class="doublespan__container"><span class="tooltip__span">j</span></span><span class="doublespan__container"><span class="tooltip__span">o</span></span><span class="doublespan__container"><span class="tooltip__span">u</span></span><span class="doublespan__container"><span class="tooltip__span">r</span></span><span class="doublespan__container"><span class="tooltip__span">n</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">y</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">1</span></span>',
        detailHTML: `
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d1_1.png" alt="midjourney-1"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d1_2.png" alt="midjourney-2"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d1_3.png" alt="midjourney-3"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d1_4.png" alt="midjourney-4"></div>`,
        'dF': 'IA',
        'dN': 'Midjourney'
      },
      {
        bg: '#F0BDBD', c: '#FF4A0B', image1: 'collections/travis1.png', image2: 'collections/travis2.png',
        flavour: '<span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >y</span></span><span class="doublespan__container"><span class="tooltip__span" >p</span></span><span class="doublespan__container"><span class="tooltip__span" >o</span></span><span class="doublespan__container"><span class="tooltip__span" >g</span></span><span class="doublespan__container"><span class="tooltip__span" >r</span></span><span class="doublespan__container"><span class="tooltip__span" >a</span></span><span class="doublespan__container"><span class="tooltip__span" >p</span></span><span class="doublespan__container"><span class="tooltip__span" >h</span></span><span class="doublespan__container"><span class="tooltip__span" >y</span></span></div>',
        name: '<div class="nav__title__name" ><span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >r</span></span><span class="doublespan__container"><span class="tooltip__span" >a</span></span><span class="doublespan__container"><span class="tooltip__span" >v</span></span><span class="doublespan__container"><span class="tooltip__span" >i</span></span><span class="doublespan__container"><span class="tooltip__span" >s</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">2</span></span>',
        detailHTML: `
          <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d2_1.png" alt="travis-1"></div>
          <div class="detail__img__container ggI" style="aspect-ratio: 1/1"><img src="detail-minified/d2_2.png" alt="travis-2"></div>
          <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d2_3.png" alt="travis-3"></div>
          <div class="detail__img__container gI" style="aspect-ratio: 2/1"><img src="detail-minified/d2_4.png" alt="travis-4"></div>
          <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d2_5.png" alt="travis-5"></div>
        `,
        'dF': 'Typography',
        'dN': 'Travis'
      },
      {
        bg: '#1F3D77', c: '#B5CBF3', image1: 'collections/Jesperish1.jpg', image2: 'collections/Jesperish2.jpg',
        flavour: '<span class="doublespan__container"><span class="tooltip__span" >D</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >G</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >A</span></span><span class="doublespan__container"><span class="tooltip__span" >L</span></span><span class="doublespan__container"><span class="tooltip__span" >&nbsp;</span></span><span class="doublespan__container"><span class="tooltip__span" >P</span></span><span class="doublespan__container"><span class="tooltip__span" >A</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >N</span></span><span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >N</span></span><span class="doublespan__container"><span class="tooltip__span" >G</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span">J</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">s</span></span><span class="doublespan__container"><span class="tooltip__span">p</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">r</span></span><span class="doublespan__container"><span class="tooltip__span">i</span></span><span class="doublespan__container"><span class="tooltip__span">s</span></span><span class="doublespan__container"><span class="tooltip__span">h</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">3</span></span>',
        detailHTML: `
        <div class="detail__img__container cI" style="aspect-ratio: 111/86"><img src="detail-minified/d5_1.png" alt="jesperish__img-1"></div>
        <div class="detail__img__container" style="aspect-ratio: 148/215"><img src="detail-minified/d5_2.png" alt="jesperish-2"></div>
        <div class="detail__img__container" style="aspect-ratio: 444/281"><img src="detail-minified/d5_3.png" alt="jesperish-3"></div>
        <div class="detail__img__container gI" style="aspect-ratio: 888/1031"><img src="detail-minified/d5_4.png" alt="jesperish-4"></div>
        <div class="detail__img__container" style="aspect-ratio: 148/215"><img src="detail-minified/d5_5.png" alt="jesperish-5" ></div>
        <div class="detail__img__container" style="aspect-ratio: 148/215"><img src="detail-minified/d5_6.png" alt="jesperish-6" ></div>
        <div class="detail__img__container" style="aspect-ratio: 148/215"><img src="detail-minified/d5_7.png" alt="jesperish-7" ></div>`,
        'dF': 'Digital Painting',
        'dN': 'Jesperish'
      },
      {
        bg: '#B2E8D7', c: '#1B795F', image1: 'collections/cherifkid1.jpg', image2: 'collections/cherifkid2.png',
        flavour: '<span class="doublespan__container"><span class="tooltip__span" >D</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >G</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >A</span></span><span class="doublespan__container"><span class="tooltip__span" >L</span></span><span class="doublespan__container"><span class="tooltip__span" >&nbsp;</span></span><span class="doublespan__container"><span class="tooltip__span" >P</span></span><span class="doublespan__container"><span class="tooltip__span" >A</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >N</span></span><span class="doublespan__container"><span class="tooltip__span" >T</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >N</span></span><span class="doublespan__container"><span class="tooltip__span" >G</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span" >C</span></span><span class="doublespan__container"><span class="tooltip__span" >H</span></span><span class="doublespan__container"><span class="tooltip__span" >E</span></span><span class="doublespan__container"><span class="tooltip__span" >R</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >F</span></span><span class="doublespan__container"><span class="tooltip__span" >K</span></span><span class="doublespan__container"><span class="tooltip__span" >I</span></span><span class="doublespan__container"><span class="tooltip__span" >D</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">4</span></span>',
        detailHTML: `
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d4_1.png" alt="cherifkid_image-1"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d4_7.jpg" alt="cherifkid_image-7"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d4_2.png" alt="cherifkid_image-2"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d4_3.png" alt="cherifkid_image-3"></div>
        <div class="detail__img__container gI" style="aspect-ratio: 2000/1555"><img src="detail-minified/d4_4.png" alt="cherifkid_image-4"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d4_5.png" alt="cherifkid_image-5" ></div>`,
        'dF': 'Digital Painting',
        'dN': 'CherifKid'
      },
      {
        bg: '#FAE27C', c: '#1C1B1D', image1: 'collections/raegular1.jpg', image2: 'collections/raegular2.jpg',
        flavour: '<span class="doublespan__container"><span class="tooltip__span">G</span></span><span class="doublespan__container"><span class="tooltip__span">r</span></span><span class="doublespan__container"><span class="tooltip__span">a</span></span><span class="doublespan__container"><span class="tooltip__span">p</span></span><span class="doublespan__container"><span class="tooltip__span">h</span></span><span class="doublespan__container"><span class="tooltip__span">i</span></span><span class="doublespan__container"><span class="tooltip__span">s</span></span><span class="doublespan__container"><span class="tooltip__span">t</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span">r</span></span><span class="doublespan__container"><span class="tooltip__span">a</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">g</span></span><span class="doublespan__container"><span class="tooltip__span">u</span></span><span class="doublespan__container"><span class="tooltip__span">l</span></span><span class="doublespan__container"><span class="tooltip__span">a</span></span><span class="doublespan__container"><span class="tooltip__span">r</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">5</span></span>',
        detailHTML: `
        <div class="detail__img__container ggI" style="aspect-ratio: 2/1"><img src="detail-minified/d6_1.png" alt="raegular-1"></div>
        <div class="detail__img__container" style="aspect-ratio: 4/5"><img src="detail-minified/d6_2.jpg" alt="raegular-2"></div>
        <div class="detail__img__container" style="aspect-ratio: 4/5"><img src="detail-minified/d6_3.jpg" alt="raegular-3"></div>
        <div class="detail__img__container " style="aspect-ratio: 4/5"><img src="detail-minified/d6_4.jpg" alt="raegular-4"></div>
        <div class="detail__img__container" style="aspect-ratio: 4/5"><img src="detail-minified/d6_5.jpg" alt="raegular-5" ></div>
        <div class="detail__img__container cI" style="aspect-ratio: 1/1"><img src="detail-minified/d6_6.jpg" alt="raegular-6" ></div>`,
        'dF': 'Graphist',
        'dN': 'Raegular'
      },
      {
        bg: '#131721', c: '#DA2607', image1: 'collections/wrath1.png', image2: 'collections/wrath2.png',
        flavour: '<span class="doublespan__container"><span class="tooltip__span">I</span></span><span class="doublespan__container"><span class="tooltip__span">A</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span">M</span></span><span class="doublespan__container"><span class="tooltip__span">i</span></span><span class="doublespan__container"><span class="tooltip__span">d</span></span><span class="doublespan__container"><span class="tooltip__span">j</span></span><span class="doublespan__container"><span class="tooltip__span">o</span></span><span class="doublespan__container"><span class="tooltip__span">u</span></span><span class="doublespan__container"><span class="tooltip__span">r</span></span><span class="doublespan__container"><span class="tooltip__span">n</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">y</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">6</span></span>',
        detailHTML: `
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d3_1.png" alt="midjourney-1"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d3_2.png" alt="midjourney-2"></div>
        <div class="detail__img__container ggI" style="aspect-ratio: 185/132"><img src="detail-minified/d3_3.png" alt="midjourney-3"></div>
        <div class="detail__img__container"style="aspect-ratio: 1/1"><img src="detail-minified/d3_4.png" alt="midjourney-4"></div>
        <div class="detail__img__container cI"style="aspect-ratio: 1/1"><img src="detail-minified/d3_5.png" alt="midjourney-5"></div>
        <div class="detail__img__container"style="aspect-ratio: 1/1"><img src="detail-minified/d3_6.png" alt="midjourney-6" ></div>`,
        'dF': 'IA',
        'dN': 'Midjourney'
      }, {
        bg: '#023025', c: '#5DAB98', image1: 'collections/jardel1.jpg', image2: 'collections/jardel2.jpg',
        flavour: '<span class="doublespan__container"><span class="tooltip__span">t</span></span><span class="doublespan__container"><span class="tooltip__span">y</span></span><span class="doublespan__container"><span class="tooltip__span">p</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">f</span></span><span class="doublespan__container"><span class="tooltip__span">a</span></span><span class="doublespan__container"><span class="tooltip__span">c</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">&nbsp;</span></span><span class="doublespan__container"><span class="tooltip__span">d</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">s</span></span><span class="doublespan__container"><span class="tooltip__span">i</span></span><span class="doublespan__container"><span class="tooltip__span">g</span></span><span class="doublespan__container"><span class="tooltip__span">n</span></span>',
        name: '<span class="doublespan__container"><span class="tooltip__span">j</span></span><span class="doublespan__container"><span class="tooltip__span">a</span></span><span class="doublespan__container"><span class="tooltip__span">r</span></span><span class="doublespan__container"><span class="tooltip__span">d</span></span><span class="doublespan__container"><span class="tooltip__span">e</span></span><span class="doublespan__container"><span class="tooltip__span">1</span></span><span class="doublespan__container"><span class="tooltip__span">l</span></span>',
        index: '<span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">0</span></span><span class="doublespan__container"><span class="tooltip__span" style="transform: translate3d(-101%,0,0)">7</span></span>',
        detailHTML: `
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d7_1.webp" alt="jardel-1"></div>
        <div class="detail__img__container" style="aspect-ratio: 1/1"><img src="detail-minified/d7_2.webp" alt="jardel-2"></div>
        <div class="detail__img__container ggI" style="aspect-ratio: 1/1"><img src="detail-minified/d7_3.webp" alt="jardel-3"></div>
        <div class="detail__img__container"style="aspect-ratio: 1/1"><img src="detail-minified/d7_4.webp" alt="jardel-4"></div>
        <div class="detail__img__container cI"style="aspect-ratio: 1/1"><img src="detail-minified/d7_5.webp" alt="jardel-5"></div>
        <div class="detail__img__container"style="aspect-ratio: 1/1"><img src="detail-minified/d7_6.webp" alt="jardel-6" ></div>`,
        'dF': 'Typface design',
        'dN': 'Jarde1l'
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
    const src = this.collectionsInfo[this.currentPage][`image${+ i + 1}`]
    media.texture.image = TEXTURE.get(src).image
  }

  getInfo() {
    return this.collectionsInfo[this.currentPage]
  }
}
export const collectionsService = new CollectionsService();

