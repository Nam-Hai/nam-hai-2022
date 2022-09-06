import { N } from "../utils/namhai";

export default class homeToContact {
  constructor(b) {
    let link = N.get('a[href="contact"]', this.element)
    if (N.Ga(link, 'href')) {
      link.click()
    }

  }
  play() {
  }
}

