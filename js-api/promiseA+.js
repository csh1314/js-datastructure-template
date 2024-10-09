function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }

  let called = false

  if (x instanceof NextPromise) {
    x.then(
      y => {
        resolvePromise(promise2, y, resolve, reject)
      },
      reason => {
        reject(reason)
      }
    )
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          reason => {
            if (called) return
            called = true
            reject(reason)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      call = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}


/**
 * https://promisesaplus.com/#notes
 */
class NextPromise {
  static stateEnum = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
  }

  PromiseState = null

  PromiseResult = undefined

  onFulfilledCallbacks = []

  onRejectedCallbacks = []

  constructor(handler) {
    this.PromiseState = NextPromise.stateEnum.PENDING
    this.PromiseResult = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (result) => {
      if (this.PromiseState === NextPromise.stateEnum.PENDING) {
        this.PromiseState = NextPromise.stateEnum.FULFILLED
        this.PromiseResult = result
        this.onFulfilledCallbacks.forEach(cb => cb())
      }
    }

    const reject = (reason) => {
      if (this.PromiseState === NextPromise.stateEnum.PENDING) {
        this.PromiseState = NextPromise.stateEnum.REJECTED
        this.PromiseResult = reason
        this.onRejectedCallbacks.forEach(cb => cb())
      }
    }

    try {
      handler(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
   onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
   onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

   // return new Promise promise 2
   const promise2 = new NextPromise((resolve, reject) => {
    if (this.PromiseState === NextPromise.stateEnum.FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfilled(this.PromiseResult)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    } else if (this.PromiseState === NextPromise.stateEnum.REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(this.PromiseResult)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    } else if (this.PromiseState === NextPromise.stateEnum.PENDING) {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      })

      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this.PromiseState)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      })
    }
   })

   return promise2
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    return this.then(
      value => {
        return NextPromise.resolve(callback()).then(() => value)
      },
      reason => {
        return NextPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  static resolve(value) {
    if (value instanceof NextPromise) {
      return value
    }
    return new NextPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new NextPromise((_, reject) => {
      reject(reason)
    })
  }

  static any(promises) {
    return new NextPromise((resolve, reject) => {
      const errors = []
      let rejectedCount = 0

      promises.forEach((p, index) => {
        NextPromise.resolve(p).then(
          value => {
            resolve(value)
          },
          reason => {
            errors[index] = reason
            rejectedCount++
            if (rejectedCount === promises.length) {
              reject(errors)
            }
          }
        )
      })
    })
  }

  static race(promises) {
    return new NextPromise((resolve, reject) => {
      promises.forEach(p => {
        NextPromise.resolve(p)
          .then(
            value => {
              resolve(value)
            },
            reason => {
              reject(reason)
            }
          )
      })
    })
  }

  static all(promises) {
    return new NextPromise((resolve, reject) => {
      const result = []
      let fulfilledCount = 0
      promises.forEach((p, index) => {
        NextPromise.resolve(p)
          .then(
            value => {
              result[index] = value
              fulfilledCount++
              if (fulfilledCount === promises.length) {
                resolve(result)
              }
            },
            reason => {
              reject(reason)
            }
          )
      })
    })
  }

  static allSettled(promises) {
    return new NextPromise((resolve) => {
      const result = []
      let settledCount = 0
      promises.forEach((p, index) => {
        NextPromise.resolve(p)
          .then(
            value => {
              result[index] = { status: NextPromise.stateEnum.FULFILLED, value }
              settledCount++
              if (settledCount === promises.length) {
                resolve(result)
              }
            },
            reason => {
              result[index] = { status: NextPromise.stateEnum.REJECTED, reason }
              settledCount++
              if (settledCount === promises.length) {
                resolve(result)
              }
            }
          )
      })
    })
  }
}


const deferred = () => {
  const result = {}
  result.promise = new NextPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

/** test code */
const { log } = console

const p1 = new NextPromise(resolve => {
  resolve('111')
}).then((res) => {
  log('p1', res)
}).then((res) => {
  log('p1', res)
  return 1
}).finally(() => {
  log('p1', 'finally')
})

const p2 = new NextPromise((_, reject) => {
  reject('111')
}).catch(reason => {
  log('p2', reason)
  return reason
}).then((res) => {
  log('p2', 'then', res)
})