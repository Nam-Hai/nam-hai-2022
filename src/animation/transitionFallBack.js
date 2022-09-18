export default class TransitionFallBack {
  constructor({ r, cb, canvas, oldRoute, route }) {
    canvas.hide(oldRoute)
    canvas.onChange(route)

  }
}
