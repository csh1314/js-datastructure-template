// 并查集
class DisjointSet{
  constructor(n){
      this.parent = new Array(n).fill(0).map((_,idx) => idx)
      // 以i为根结点的子集大小
      this.size = new Array(n).fill(1)
      // 子集个数
      this.count = n
  }
  // 查找根元素
  findParent(x){
      if(this.parent[x] === x) return x
      return this.findParent(this.parent[x])
  }
  // 合并a、b集合
  union(a, b){
      const { parent, size } = this
      let x = this.findParent(a), y = this.findParent(b)
      if(x !== y){
          if(size[x] < size[y]){
              [x, y] = [y, x]
          }
          parent[y] = x
          size[x] += size[y];
          this.count -= 1
          return true
      }
      return false
  }
  // a、b集合是否相连
  isConnected(a, b){
      return this.findParent(a) === this.findParent(b)
  } 
}

export default DisjointSet