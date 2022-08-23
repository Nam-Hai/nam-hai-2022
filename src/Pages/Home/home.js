import Page from "../../classes/Page";
import gridFixation from "../../components/gridFixation/gridFixation";
import homeTemplate from "./home.html?raw"

export default class Home extends Page {
  constructor() {
    super({
      components: {
        'grid-fixation': gridFixation
      },
      content: homeTemplate,
      name: 'home'
    })

  }

  render(node) {
    super.render(node)



  }
}
