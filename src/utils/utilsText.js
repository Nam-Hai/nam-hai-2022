import { N } from "./namhai";
import { calculate } from "./text";

export function stringLetterToDoubleSpan(element, className) {

  console.log(element);
  let innerHTML = element.innerHTML.toString().trim()
  element.innerHTML = ''

  let letters = innerHTML.split('')
  console.log(letters);
  for (const letter of letters) {
    let parent = N.Cr('span')
    parent.classList.add('doublespan__container')
    let span = N.Cr('span')
    span.classList.add(className)

    span.innerHTML = letter === ' ' ? '&nbsp' : letter
    parent.appendChild(span)
    element.appendChild(parent)

  }
}
export function stringLetterToSpan(element) {

  let innerHTML = element.innerHTML.toString().trim()
  element.innerHTML = ''

  let letters = innerHTML.split('')
  for (const letter of letters) {
    let span = N.Cr('span')
    span.classList.add('singlespan__container')

    span.innerHTML = letter === ' ' ? '&nbsp' : letter
    element.appendChild(span)

  }
}
