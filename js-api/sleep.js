class Person {
  isRunning = false

  queue = []

  async triggerTask() {
    if (this.isRunning) return
    this.isRunning = true
    while(this.queue.length) {
      const task = this.queue.pop()
      await task()
    }
    this.isRunning = false
  }
  eat(something) {
    const task = () => {
      console.log(Date.now(), '----', something)
    }
    this.queue.unshift(task)
    this.triggerTask()
    return this
  }
  sleep(time) {
    const task = async () => {
      await new Promise(resolve => {
        setTimeout(resolve, time)
      })
    }
    this.queue.unshift(task)
    this.triggerTask()
    return this
  }
}

class PersonV2 {
  queue = Promise.resolve()

  addTask(task) {
    this.queue = this.queue.then(task)
  }

  eat(something) {
    const task = () => {
      console.log(Date.now(), '----', something)
    }
    this.addTask(task)
    return this
  }
  sleep(time) {
    const task = async () => {
      await new Promise(resolve => {
        setTimeout(resolve, time)
      })
    }
    this.addTask(task)
    return this
  }
}

const person = new PersonV2()

person
  .eat('breakfast')
  .sleep(1000)
  .eat('lunch')
  .sleep(2000)
  .sleep(3000)
  .eat('dinner')