function throttle(fn, interval) {
  let last = 0
  return function(...args) {
    const context = this
    const now = Date.now()
    if (now - last > interval) {
      fn.call(context, ...args)
      last = now
    }
  }
}

function debounce(fn, delay) {
  let timer
  return function(...args) {
    const context = this
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(context, ...args)
    }, delay)
  }
}