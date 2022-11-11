import { N } from "../utils/namhai";
import { Texture, Program, Plane, Mesh } from 'ogl'
import BasicFrag from './shaders/BasicFrag.glsl?raw'
import BasicVer from './shaders/BasicVer.glsl?raw'

export default class TransitionHomeCollections {
  constructor({ cb, canvas, oldRoute, route, pageBufferContent }) {

    let detailWrapper = N.get('.detail__wrapper')
    // let bgColor = getComputedStyle(detailWrapper).getPropertyValue('--bg-color')
    // detailWrapper.style.setProperty('--bg-color', bgColor + '00')

    this.gl = canvas.gl
    this.tl = new N.TL()
    let distTexture = new Texture(this.gl)
    let distImage = new window.Image()
    distImage.src = 'distTexture.jpg'
    distImage.onload = _ => {
      distTexture.image = distImage
    }

    this.canvas = canvas

    let program = new Program(this.gl, {
      fragment: BasicFrag,
      vertex: BasicVer,
      // depthTest: false,
      uniforms: {
        resolution: {
          value: [this.canvas.size.width, this.canvas.size.height]
        },
        tMap: {
          value: new Texture(this.gl)
        },
        tDist: {
          value: distTexture
        },
        f: {
          value: 0
        }
      }
    })

    let mesh = new Mesh(this.gl, {
      geometry: new Plane(this.gl, {
        heightSegments: 20,
        widthSegments: 20
      }),
      program
    })
    mesh.scale.x = this.canvas.size.width * (1)
    mesh.scale.y = this.canvas.size.height * (1)
    html2canvas(N.get('.main')).then((canvas) => {
      const base64image = canvas.toDataURL("image/png");
      let image = new window.Image()
      image.src = base64image
      let texture = new Texture(this.gl)
      image.onload = async c => {
        texture.image = image
        mesh.program.uniforms.tMap.value = texture

        pageBufferContent.classList.add('buffer-main__cover')
        this.canvas.collections.getBounds()
        this.canvas.onChange('collections')

        await new Promise(s => {

          this.canvas.collections.init(s)
        })
        // this.canvas.hide(oldRoute)
        mesh.setParent(this.canvas.scene)
        this.tl.from({
          d: 1000,
          e: 'io3',
          update: t => {
            mesh.scale.x = this.canvas.size.width * (1 - t.progE)
            mesh.scale.y = this.canvas.size.height * (1 - t.progE)
            mesh.position.x = -this.canvas.size.width * (3 / 5) * t.progE
            mesh.position.y = this.canvas.size.height * (3 / 5) * t.progE

            mesh.program.uniforms.f.value = t.progE
          },
          cb: _ => {
            this.canvas.scene.removeChild(mesh)
            cb()
          }
        })

        this.tl.play()

      }
    });
  }

  play() {
  }
}

