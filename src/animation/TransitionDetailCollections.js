import { N } from "../utils/namhai";
import { Texture, Program, Plane, Mesh } from 'ogl'
import BasicFrag from './shaders/BasicFrag.glsl?raw'
import WhiteFrag from './shaders/WhiteFrag.glsl?raw'
import BasicVer from './shaders/BasicVer.glsl?raw'

export default class TransitionHomeCollections {
  constructor({ cb, canvas, oldRoute, route, pageBufferContent }) {

    let detailWrapper = N.get('.detail__wrapper')
    // let bgColor = getComputedStyle(detailWrapper).getPropertyValue('--bg-color')
    // detailWrapper.style.setProperty('--bg-color', bgColor + '00')

    this.gl = canvas.gl
    this.tl = new N.TL()


    this.canvas = canvas

    let program = new Program(this.gl, {
      fragment: BasicFrag,
      vertex: BasicVer,
      uniforms: {
        resolution: {
          value: [this.canvas.size.width, this.canvas.size.height]
        },
        tMap: {
          value: new Texture(this.gl)
        },
        f: {
          value: 0
        }
      }
    })

    let whiteMesh = new Mesh(this.gl, {
      geometry: new Plane(this.gl, {
        heightSegments: 50,
        widthSegments: 50
      }),
      program: new Program(this.gl, {
        fragment: WhiteFrag,
        vertex: BasicVer,
        uniforms: {
          resolution: {
            value: [this.canvas.size.width, this.canvas.size.height]
          },
          f: {
            value: 0
          }
        }
      })
    })

    let mesh = new Mesh(this.gl, {
      geometry: new Plane(this.gl, {
        heightSegments: 50,
        widthSegments: 50
      }),
      program
    })

    const borderWidth = 1.07
    mesh.scale.x = this.canvas.size.width * (1)
    mesh.scale.y = this.canvas.size.height * (1)
    whiteMesh.scale.x = this.canvas.size.width * borderWidth
    whiteMesh.scale.y = this.canvas.size.height * borderWidth
    whiteMesh.position.z = -0.1
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


        this.canvas.collections.init()
        // this.canvas.hide(oldRoute)
        whiteMesh.setParent(this.canvas.scene)
        mesh.setParent(this.canvas.scene)
        this.tl.from({
          d: 1000,
          e: 'io3',
          update: t => {
            whiteMesh.scale.x = this.canvas.size.width * borderWidth * (1 - t.progE)
            whiteMesh.scale.y = this.canvas.size.height * borderWidth * (1 - t.progE)
            whiteMesh.position.x = -this.canvas.size.width * (3 / 5) * t.progE
            whiteMesh.position.y = this.canvas.size.height * (3 / 5) * t.progE
            whiteMesh.program.uniforms.f.value = N.Clamp(t.progE * 2, 0, 1)

            mesh.scale.x = this.canvas.size.width * (1 - t.progE)
            mesh.scale.y = this.canvas.size.height * (1 - t.progE)
            mesh.position.x = -this.canvas.size.width * (3 / 5) * t.progE
            mesh.position.y = this.canvas.size.height * (3 / 5) * t.progE

            mesh.program.uniforms.f.value = N.Clamp(t.progE * 2, 0, 1)
          },
          cb: _ => {
            this.canvas.scene.removeChild(whiteMesh)
            this.canvas.scene.removeChild(mesh)
            this.canvas.collections.init()
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

