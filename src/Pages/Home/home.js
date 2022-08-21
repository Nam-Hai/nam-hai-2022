import Page from "../../classes/Page";
import homeTemplate from "./home.html?raw"

export default class Home extends Page {
  constructor() {
    super({
      elements: {},
      components: {},
      content: homeTemplate,
      name: 'home'
    })
    this.caca = 'zizi'

  }
}
