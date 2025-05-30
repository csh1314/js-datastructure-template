/**
 * https://github.com/reduxjs/redux/blob/master/src/compose.ts
 * @description 返回一个函数,是这多个函数从右到左执行的一个组合(compose),并且前一个函数执行的结果作为后一个函数的入参
 * @param  {...function} funcList 
 * @return {function} 
 */
function composeSync(...funcList) {
  if (funcList.length === 0) {
    return args => args
  }
  if (funcList.length === 1) {
    return funcList[0]
  }
  return funcList.reduce(
    (a, b) =>
      (...args) => a(b(...args))
  )
}

// test code
const add = x => x+1
const sub = x => x-1
const double = x => x*2
// exp: add(sub(double(1))) => 1 * 2 - 1 + 1 = 2
const calc = composeSync(add, sub, double)
console.log(calc(1)) // 2


/**
 * https://github.com/koajs/compose/blob/master/index.js
 * @description 异步compose, koa洋葱模型实现基本原理
 * @param  {Array} middleware
 * @return {Function}
 */
function compose(middleware) {
  if (
    !Array.isArray(middleware) 
    || middleware.some(fn => typeof fn !== 'function')
  ) {
    throw new Error('Middleware must be a function list')
  }
  return (context, next) => {
    let idx = -1
    const dispatch = i => {
      if (i <= idx) return Promise.reject(new Error('next() called multiple times'))
      idx = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, () => dispatch(i+1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}
function composeSlim(middlewares) {
  if (
    !Array.isArray(middlewares) 
    || middlewares.some(fn => typeof fn !== 'function')
  ) {
    throw new Error('Middlewares must be a function list')
  }

  const dispatch = i => async (ctx, next) => {
    const fn = i === middlewares.length 
      ? next 
      : middlewares[i]
    if (!fn) return
    return await fn(ctx, dispatch(i+1))
  }

  return dispatch(0)()
}


// test code
const log = console.log.bind(null)
const app = {
  context: {},
  middleware: [],
  use(fn) {
    this.middleware.push(fn)
    return this
  },
  createContext(req, res){
    this.context.req = {...(this.context.req ? this.context.req : {}), ...req}
    this.context.res = {...(this.context.res ? this.context.res : {}), ...res}
    return this.context
  },
  doRequest(ctx, fn) {
    const onResponse = () => {}
    const onError = () => {}
    return fn(ctx).then(onResponse).catch(onError)
  },
  run() {
    const fn = compose(this.middleware)
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.doRequest(ctx, fn)
    }
    return handleRequest
  },

  runBySlim() {
    const fn = composeSlim(this.middleware)
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.doRequest(ctx, fn)
    }
    return handleRequest
  }
}

app.use(
  async (ctx, next) => {
    const a = await Promise.resolve('property a')
    ctx.a = a
    log('middleware a', ctx)
    await next()
    log('a over')
  }
)
app.use(
  async (ctx, next) => {
    const b = await Promise.resolve('property b')
    ctx.b = b
    log('middleware b', ctx)
    await next()
    log('b over')
  },
)
app.run()() 
// listen app.run()

/**
  middleware a { req: {}, res: {}, a: 'property a' }
  middleware b { req: {}, res: {}, a: 'property a', b: 'property b' }
  b over
  a over
 */