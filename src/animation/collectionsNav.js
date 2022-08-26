import { N } from "../utils/namhai";

export default class collectionsNav {
  constructor() {
    let link = N.get('a[href="home"]', this.element)
    if (N.Ga(link, 'href')) {
      link.click()
    }
  }

  play() {
  }


}

