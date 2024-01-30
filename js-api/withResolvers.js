/**
 * Promise.withResolvers
 * see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
 * `
   let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    `
 */

Promise.prototype.withResolvers = function() {
  if (!this) throw new TypeError('Promise.withResolvers called on non-object')
  const obj = {}
  obj.promise = new this(
    (resolve, reject) => {
      obj.resolve = resolve
      obj.reject = reject
    }
  )
  return obj
}

