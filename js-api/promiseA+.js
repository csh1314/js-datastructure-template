
class NextPromise {
  static stateEnum = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
  }

  PromiseState = null

  PromiseResult = null

  constructor(handler) {
    this.PromiseState = NextPromise.stateEnum.PENDING
    this.PromiseResult = null
    try {
      // 注意resolve和reject里的this指向
      handler(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(result) {
    if (this.PromiseState === NextPromise.stateEnum.PENDING) {
      this.PromiseState = NextPromise.stateEnum.FULFILLED
      this.PromiseResult = result
    }
  }

  reject(reason) {
    if (this.PromiseState === NextPromise.stateEnum.PENDING) {
      this.PromiseState = NextPromise.stateEnum.REJECTED
      this.PromiseResult = reason
    }
  }

  /**
   * https://promisesaplus.com/#notes
   */
  then(onFulfilled, onRejected) {
    // 2.2.7规范 then 方法必须返回一个 promise 对象
    const promise2 = new NextPromise((resolve, reject) => {
      if (this.PromiseState === NextPromise.stateEnum.FULFILLED) {
        // 2.2.4规范 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用
        // 这里的平台代码指的是引擎、环境以及 promise 的实施代码。
        // 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
        // 这个事件队列可以采用“宏任务（macro-task）”机制，比如setTimeout 或者 setImmediate； 也可以采用“微任务（micro-task）”机制来实现， 比如 MutationObserver 或者process.nextTick。
        setTimeout(() => {
          try {
            // 2.2.7.3规范 如果 onFulfilled 不是函数且 promise1 成功执行, promise2 必须成功执行并返回相同的值
            if (typeof onFulfilled !== 'function') resolve(this.PromiseResult)
            else {
              
            }
          } catch (e) {
            // 2.2.7.2规范 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
            reject(e)
          }
        })
      }
    })

    return promise2
  }
}

/** test code */
const p1 = new NextPromise(resolve => {
  resolve('111')
})