import Component from "../../classes/Component";
import { N } from "../../utils/namhai";
import content from './ressortButton.html?raw'
import testAnimation from "../../animation/test";
import PreloaderTooltipAnimation from "../../animation/preloaderTooltipAnimation";

const k = 0.05
const c = 0.2
const l0 = 0;

const animeCompletionMap = new Map([
  ['testAnimation', testAnimation],
])

const animeOnMarkerMap = new Map([
  ['preloaderTooltip', PreloaderTooltipAnimation]
])

export default class ressortButton extends Component {
  constructor({ name, node }) {

    // let color = N.Ga(node, 'color') || 'red'

    super({
      name, content, node,
      input: {
        axis: null,
        distance: '96',
        both: '0',
        animeOnCompletion: null,
        animeOnMarker: null,
        link: null
      }
    })

    this.isToggled = false
    this.markerOn = false
    this.markerRot = 0

    this.clicked = false
    this.currentOffsetClick = 0

    this.coor = {
      pos: 0,
      velo: 0,
      acc: 0
    }

    N.BM(this, ['update', 'onMouseDown', 'onMouseMove', 'onMouseUp'])
    this.raf = new N.RafR(this.update)

    this.timeline = new N.TL

    this.crossTemplate = N.get('.cross__wrapper', this.element)

    this.createFixation(this.distance)
    if (this.both == '1') {
      this.createFixation(-this.distance)
    }

  }

  createFixation(d) {
    let w = N.Cr('a')
    if (this.link) {
      w.setAttribute('href', this.link)
    }
    w.innerHTML = this.crossTemplate.innerHTML
    w.classList.add('cross__wrapper')
    const x = this.axis === 'x' ? d : 0,
      y = this.axis === 'y' ? d : 0;
    let c = N.get('.cross__container', w)
    c.style.transform = `translate(${x}px,${y}px)`
    this.element.appendChild(w)
  }

  addCallback(cb) {

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

    if (!this.markerOn && this.coor.pos > this.distance / 2) {
      this.turnMarker(true)
    }
    if (this.markerOn && this.coor.pos <= this.distance / 2) {
      this.turnMarker(false)
    }
  }

  onMouseUp(e) {
    this.clicked = false
    this.raf.run()

    if (this.markerOn) {
      this.isToggled = true
      N.pe(this.button, 'none')

      if (this.animeOnCompletion) {
        let anime = new (animeCompletionMap.get(this.animeOnCompletion))()
        anime.play()
      }
    }
  }

  turnMarker(b) {
    this.markerOn = b
    this.timeline.pause()
    this.timeline = new N.TL
    this.timeline.from({
      d: 500,
      e: 'o5',
      update: t => {
        this.markerRot = t.prog
        t = N.Ease.io4(t.prog) * 135
        t = b ? t : 135 - t
        this.marker.style.transform = `rotate(${t}deg)`
      }
    })
    if (this.animeOnMarker) {
      new (animeOnMarkerMap.get(this.animeOnMarker))(b).play()
    }

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
    }

    this.coor.acc = 0
  }

  applyForce() {
    this.coor.acc = k * (l0 - this.coor.pos) - c * this.coor.velo
  }
}
