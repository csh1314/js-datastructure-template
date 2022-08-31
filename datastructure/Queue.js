/**
 * 前置知识:
 * JavaScript中Array默认是一个栈
 * Array.prototype.shift/unshift 的时间复杂度都为 O(n)
 * 因此,在实现BFS(广度优先搜索)等场景使用Array时,不要使用shift()/unshift()
 */
/**
 * 使用栈来实现一个队列,使其 push/pop/peek 的时间复杂度都为 O(1)
 * 思路: 一个作插入栈, 一个作删除栈
 */
class Queue {
  constructor(){
    this.insert = []
    this.delete = []
  }
  push(value){
    this.insert.push(value)
  }
  pop(){
    if(this.isEmpty()) return undefined
    if(this.delete.length){
      return this.delete.pop()
    }
    while(this.insert.length){
      this.delete.push(this.insert.pop())
    }
    return this.delete.pop()
  }
  peek(){
    if(this.isEmpty()) return undefined
    if(this.delete.length){
      return this.delete[this.delete.length-1]
    }
    return this.insert[0]
  }
  isEmpty(){
    return !this.insert.length && !this.delete.length
  }
}

export default Queue