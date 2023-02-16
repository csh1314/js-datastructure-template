const log = console.log.bind(null)
const fetch = () => new Promise(r => setTimeout(() => r('data'), 1e3))

/**
 * async await
 */
async function exp() {
  const data1 = await fetch()
  log('data 1 =>', data1)
  const data2 = await fetch()
  log('data 2 =>', data2)
}
/**
 * Generator
 */
function* expG() {
  const data1 = yield fetch()
  log('data 1 =>', data1)
  const data2 = yield fetch()
  log('data 2 =>', data2)
}

/** 
 * exp() 等同于 spawn(expG)
 * async await的实现原理: Promise + Generator
 * 看起来只是将 aysnc => *, await => yield
 * 然后外层套了一个spawn
 */
spawn(expG)

function spawn(genFunc) {
  return new Promise((resolve, reject) => {
    const gen = genFunc()
    function step(nextFunc) {
      let next
      try {
        next = nextFunc()
      } catch (err) {
        return reject(err)
      }
      const { value, done } = next
      if (done) {
        return resolve(value)
      }
      return Promise.resolve(value).then(
        function onResolve(val) {
          step(() => gen.next(val))
        },
        function onError(e) {
          step(() => gen.throw(e))
        }
      )
    }
    step(() => gen.next())
  })
}
