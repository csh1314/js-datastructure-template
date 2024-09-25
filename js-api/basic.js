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


Function.prototype._call = function (context, ...args) {
  const fn = this

  context = (context !== null && context !== undefined) ? Object(context) : window
  context.fn = fn

  const result = context.fn(...args)
  delete context.fn

  return result
}

Function.prototype._apply = function (context, args = []) {
  const fn = this

  context = (context !== null && context !== undefined) ? Object(context) : window
  context.fn = fn

  const result = context.fn(...args)
  delete context.fn

  return result
}

// 不使用call、apply实现
Function.prototype._bind = function (context, ...args1) {
  const fn = this

  context = (context !== null && context !== undefined) ? Object(context) : window
  
  function proxyFn(...args2) {
    context.fn = fn
    const callArgs = [...args1, ...args2]
    const result = context.fn(...callArgs)
    delete context.fn
    return result
  }

  return proxyFn
}


Function.prototype._bind2 = function (context, ...args1) {
  return function(...args2) {
    const fn = this
    return fn.apply(context, args1.concat(args2))
  }
}