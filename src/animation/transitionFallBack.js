export default class TransitionFallBack {
  constructor({ r, cb, canvas, oldRoute, route }) {
    console.log(route, oldRoute);
    canvas.hide(oldRoute)
    canvas.onChange(route)

  }
}
