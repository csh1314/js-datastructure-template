// ref: https://github.com/scopsy/await-to-js

/**
 * 好处是不用给Promise单独包catch
 * 但这种只能捕获异步错误, 感觉可以改造下
 */
function awaitToSync(promise) {
  return new Promise(resolve => {
    promise
      .then(data => {
        resolve([null, data])
      })
      .catch(err => {
        resolve([err, undefined])
      })
  })
}

// test code
;(async () => {
  const [error, data] = await awaitToSync(Promise.reject('error'))
  if (error) {
    // handle error
    console.log(error)
  } else {
    // handle data
    console.log('data', data)
  }

  const [err1, data1] = await awaitToSync(Promise.resolve('some data'))
  if (err1) {
    // handle error
    console.log(err1)
  } else {
    // handle data
    console.log('data: ', data1)
  }
})()