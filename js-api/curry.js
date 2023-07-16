function curry(fn) {
  const fnLen = fn.length
  return function curried(...args) {
    if (args.length >= fnLen) {
      return fn.apply(this, args)
    }
    return function(...restArgs) {
      return curried.apply(this, args.concat(restArgs))
    }
  }
}


// test code

// write by arrow function
const wrappedCommonPayloadV1 = (fn) => (commonPayload) => (payload) => fn({
    ...commonPayload,
    ...payload
  })


// write by curry function
const wrappedCommonPayloadV2 = fn => {
  // only one new fn
  // you can add more arguments ...
  const newFn = (commonPayload, payload) => fn({
      ...commonPayload,
      ...payload,
    })
  return curry(newFn)
}

const originFetchSomeData = payload => {
  console.log('fetchData payload ====>', payload)
}

const enhanceFetchSomeDataV1 = wrappedCommonPayloadV1(originFetchSomeData)({
  commonData: 'this is common data v1'
})

const enhanceFetchSomeDataV2 = wrappedCommonPayloadV2(originFetchSomeData)({
  commonData: 'this is common data v2'
})

enhanceFetchSomeDataV1({ payload: 'xxxxx 业务传入' })
enhanceFetchSomeDataV2({ payload: 'xxxxx 业务传入' })


const add = (a, b, c, d, e) => a + b + c + d + e
const curriedAdd = curry(add)
console.log(curriedAdd(1, 1)(1)(1)(1))