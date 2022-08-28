import Component from "../../classes/Component";
import { N } from "../../utils/namhai";
import content from './ressortButton.html?raw'
import PreloaderTooltipAnimation from "../../animation/preloaderTooltipAnimation";
import preloaderComplete from "../../animation/preloaderComplete";
import homeTextTransform from "../../animation/homeTextTransform";
import collectionsNext from "../../animation/collectionsNext";
import collectionsNav from "../../animation/collectionsNav";
import homeNav1 from "../../animation/homeNav1";
import collectionsPrevious from "../../animation/collectionsPrevious";
import homeTooltipContact from "../../animation/homeTooltipContact";
import homeTooltipCollections from "../../animation/homeTooltipCollections";
import collectionsTooltipBack from "../../animation/collectionsTooltipBack";

const k = 0.05
const c = 0.2
const l0 = 0;

const rForce = 1.5

const animeCompletionMap = new Map([
  ['preloaderComplete', preloaderComplete],
  ['homeTextTransform', homeTextTransform],
  ['homeNav1', homeNav1],
  ['collectionsNext', collectionsNext],
  ['collectionsNav', collectionsNav]
])

const animeCompletionMap2 = new Map([
  ['collectionsPrevious', collectionsPrevious],
])

const animeOnMarkerMap = new Map([
  ['preloaderTooltip', PreloaderTooltipAnimation],
  ['homeTooltipCollections', homeTooltipCollections],
  ['collectionsTooltipBack', collectionsTooltipBack]
])
const animeOnMarkerMap2 = new Map([
  ['homeTooltipContact', homeTooltipContact],
])
export default class ressortButton extends Component {
  constructor({ name, node }) {

    // let color = N.Ga(node, 'color') || 'red'

    super({
      name, content, node,
      input: {
        axis: null,
        distance: '96',
        both: null,
        animeOnCompletion: null,
        animeOnCompletion2: null,
        animeOnMarker: null,
        animeOnMarker2: null,
        link: null,
        link2: null
      }
    });

    this.distance = +this.distance

    this.end = false
    this.markerOn = false
    this.markerRot = 0

    this.clicked = false
    this.currentOffsetClick = 0

    this.coor = {
      pos: 0,
      velo: 0,
      acc: 0
    }

    N.BM(this, ['update', 'onMouseDown', 'onMouseMove', 'onMouseUp', 'turnMarker'])
    this.raf = new N.RafR(this.update)

    this.timeline = new N.TL
    this.timeline2 = new N.TL
    this.timeline3 = new N.TL

    this.crossTemplate = N.get('.cross__wrapper', this.element)

    this.createFixation(this.distance, 1)
    if (this.both == '1') {
      this.createFixation(-this.distance, 2)
    }

  }

  createFixation(d, n = 1) {
    let w = N.Cr('a')
    if (n) {
      let link = n === 1 ? this.link : this.link2
      if (this.link) {
        w.setAttribute('href', link)
      }
    }
    w.innerHTML = this.crossTemplate.innerHTML
    w.classList.add('cross__wrapper')
    const x = this.axis === 'x' ? d : 0,
      y = this.axis === 'y' ? d : 0;
    let c = N.get('.cross__container', w)
    c.style.transform = `translate(${x}px,${y}px)`
    this.element.appendChild(w)
  }

  render(node) {
    super.render()

    this.button = N.get('button', this.element)
    this.marker = N.get('.cross__container__neutral', this.element)
    this.passivBounds = this.button.getBoundingClientRect()
  }

  addEventListener() {
    this.button.addEventListener('mousedown', this.onMouseDown)
  }

  onMouseDown(e) {
    this.coor.velo = 0
    this.coor.acc = 0
    this.raf.stop()


    this.clicked = true
    this.currentOffsetClick = this.passivBounds[this.axis] + this.coor.pos - e[this.axis]
  }
  onMouseMove(e) {
    if (!this.clicked) return
    const a = this.axis
    const delta = -this.passivBounds[a] + e[a] + this.currentOffsetClick
    this.coor.pos = delta / 1.5

    const x = this.axis === 'x' ? this.coor.pos : 0,
      y = this.axis === 'y' ? this.coor.pos : 0
    N.T(this.button, x, y, 'px')

    let pos = this.both ? Math.abs(this.coor.pos) : this.coor.pos
    const bD = this.distance > 0 ? pos > this.distance / rForce : pos < this.distance / rForce,
      bP = this.distance > 0 ? this.coor.pos < 0 : this.coor.pos > 0

    if (!this.markerOn && bD) {
      this.turnMarker(true, bP)
    }
    if (this.markerOn && !bD) {
      this.turnMarker(false)
    }

  }

  onMouseUp(e) {
    this.clicked = false
    this.raf.run()

    if (this.markerOn) {
      this.isToggled = true
      if (this.link) {
        N.pe(this.button, 'none')
      }

      if (!this.secondMarker) {
        if (this.animeOnCompletion) {
          let anime = new (animeCompletionMap.get(this.animeOnCompletion))(this.link)
          anime.play()
        }
      } else {
        if (this.animeOnCompletion2) {
          let anime2 = new (animeCompletionMap2.get(this.animeOnCompletion2))()
          anime2.play()
        }
      }
    }
    this.turnMarker(false, false, true)
  }

  turnMarker(b, secondMarker = false, onMouseUp = false) {
    const a = (2 * secondMarker - 1)
    if (this.markerOn == b) return
    this.markerOn = b
    this.timeline.pause()
    this.timeline = new N.TL
    this.timeline.from({
      d: 300,
      e: 'o5',
      update: t => {
        this.markerRot = t.prog
        t = N.Ease.io4(t.prog) * 135
        t = b ? a * t : 135 - t
        this.marker.style.transform = `rotate(${t}deg)`
      }
    })
    if (this.animeOnMarker && !onMouseUp) {
      if (this.secondMarker || secondMarker) {
        this.timeline2.pause()
        this.timeline2 = new N.TL
        let tl = new (animeOnMarkerMap2.get(this.animeOnMarker2))(b).tl
        this.timeline2.arr.push(...tl.arr)
        this.timeline2.play()
      } else if (!secondMarker) {
        this.timeline3.pause()
        this.timeline3 = new N.TL
        let tl = new (animeOnMarkerMap.get(this.animeOnMarker))(b).tl
        this.timeline3.arr.push(...tl.arr)
        this.timeline3.play()
      }
    }

    this.secondMarker = secondMarker
    this.timeline.play()
  }

  update() {
    this.applyForce()
    this.coor.velo += this.coor.acc
    this.coor.pos += this.coor.velo

    const x = this.axis === 'x' ? this.coor.pos : 0,
      y = this.axis === 'y' ? this.coor.pos : 0
    N.T(this.button, x, y, 'px')

    if (Math.abs(this.coor.acc) <= 0.005) {
      this.raf.stop()
      if (this.isToggled) {
        this.end = true
      }
    }

    this.coor.acc = 0
  }

  applyForce() {
    this.coor.acc = k * (l0 - this.coor.pos) - c * this.coor.velo
  }
}
