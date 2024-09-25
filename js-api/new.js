function _new(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new Error('constructor must be a function')
  }

  // obj.__proto__ = constructor.prototype
  const obj = Object.create(constructor.prototype)

  const result = constructor.apply(obj, args)

  const isObject = typeof result === 'object' && result !== null
  const isFunction = typeof result === 'function'

  return (isFunction || isObject) ? result : obj
}


function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.say = function() {
  console.log('name', this.name, '; age', this.age)
}

const p = _new(Person, 'xx', 18)

p.say()