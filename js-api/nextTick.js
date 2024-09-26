/** Vue3 nextTick */

// 关键流程
// 1. 将callback塞入queue
// 2. 如果 pendingPromise 不为空, 说明当前正在清空queue, 则无需新创建微任务
// 3. 否则，创建微任务来清空queue

let pendingPromise

const callbacks = []

function queueCallback(cb) {
  callbacks.push(cb)
}

function flushCallback() {
  const clone = callbacks.slice(0)
  // 队列清空
  callbacks.length = 0
  clone.forEach(cb => cb())
  clone.length = 0

  pendingPromise = null
}

function nextTick(callback) {
  return new Promise(resolve => {
    queueCallback(() => {
      if (callback) {
        callback()
      } else {
        resolve()
      }
    })

    pendingPromise = pendingPromise || Promise.resolve().then(flushCallback)
  })
}


console.log(1)
setTimeout(() => {
  console.log(2)
})
nextTick(() => {
  console.log(3)
})
Promise.resolve().then(() => {
  console.log(4)
})
nextTick(() => {
  console.log(5)
})
nextTick(() => {
  console.log(6)
})


// 1 3 5 6 4 2