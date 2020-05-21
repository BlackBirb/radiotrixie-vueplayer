export function debounce(fn, ms) {
  let debounced = 0
  return function () {
    clearTimeout(debounced)
    debounced = setTimeout(() =>
      fn.apply(this, arguments)
    , ms)
  }
  // return cb
}