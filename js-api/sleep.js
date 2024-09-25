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

const person = new Person()

person
  .eat('breakfast')
  .sleep(1000)
  .eat('lunch')
  .sleep(2000)
  .sleep(3000)
  .eat('dinner')