const asyncTask = () => new Promise(resolve => {
  resolve({
    data: Math.random() * 1e5
  })
}).then(data => {
  console.log(`${new Date().toLocaleTimeString()}`, 'asyncTask=>', data)
})

const sleep = (timeout = 2e3) => new Promise(resolve => setTimeout(() => {
  resolve('sleep====>' + timeout + 'ms')
}, timeout)).then(data => {
  console.log(`${new Date().toLocaleTimeString()}`, data)
})


const withAsyncChain = (asyncTaskPool) => {
  let currentTask = Promise.resolve()

  // const execute = () => {
  //   const task = tasks.shift()
  //   if (task) {
  //     if (q) {
  //       q.then(() => {
  //         hangUp()
  //         task()
  //           .then(() => {
  //             ready && ready()
  //           })
  //       })
  //     } else {
  //       hangUp()
  //       task()
  //         .then(() => {
  //           ready && ready()
  //         })
  //     }
  //   }
  // }

  const coverTaskPool = {}
  for(const [k, fn] of Object.entries(asyncTaskPool)) {
    const coverFn = (...args) => {
      currentTask = currentTask.then(() => Promise.resolve(fn(...args)))
      return coverTaskPool
    }
    coverTaskPool[k] = coverFn
  }

  return coverTaskPool
}


const chain = withAsyncChain({
  asyncTask,
  sleep,
  syncTask: () => {
    console.log(`${new Date().toLocaleTimeString()}`, 'syncTask')
  }
})

chain.asyncTask()
  .sleep(2e3)
  .asyncTask()
  .syncTask()
  .syncTask()
  .sleep(1e3)
  .syncTask()
  .asyncTask()
  .asyncTask()
  .syncTask()
  .sleep(5e3)
  .asyncTask()