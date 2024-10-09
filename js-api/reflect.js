/**
 * Reflect
 * es6中用来操作对象的语法,相当于之前es5对象方法的新API
 * 与Proxy相对应使用, 不管Proxy怎么修改默认行为, 你总可以在Reflect上获取默认行为。
    Reflect.apply(target, thisArg, args)
    Reflect.construct(target, args)
    Reflect.get(target, name, receiver)
    Reflect.set(target, name, value, receiver)
    Reflect.defineProperty(target, name, desc)
    Reflect.deleteProperty(target, name)
    Reflect.has(target, name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)
 */

const log = console.log.bind(null)

const obj = { a: 1, b:2, c: [1,2] }
const logObj = new Proxy(obj, {
  get(target, name) {
    log('get', target, name)
    return Reflect.get(target, name)
  },
  deleteProperty(target, name) {
    log('delete', target, name)
    return Reflect.deleteProperty(target, name)
  },
  has(target, name) {
    log('has', target, name)
    return Reflect.has(target, name)
  }
})


// 实现一个简单的观察者模式
const observers = new Set()
const observe = fn => observers.add(fn)
const makeObservable = obj => new Proxy(obj, {
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    observers.forEach(fn => fn())
    return result
  }
})

const person = makeObservable({
  name: '张三',
  age: 18,
})
observe(() => {
  log('监听到set ===>', person.name, person.age)
})
person.name = '李四'