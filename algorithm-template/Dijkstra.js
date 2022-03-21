// 建图
function createGraph(edges) {
	const g = {}
	for(const [f, t, w] of edges) {
		g[f] = g[f] || []
		g[f].push([t, w])
	}
	return g
}
// dijkstra算法,求 节点s 在 带权有向图G 中到其他节点的最短路长
// 用堆实现的写法
function dijkstra(G, N, s) {
	const distance = new Array(N).fill(Infinity)
	distance[s] = 0
	const pq = new PriorityQueue((a,b) => a[1] < b[1])
	pq.push([s, 0])
	while(pq.size) {
		const [f, d] = pq.pop()
		if(d > distance[f] || !G[f]) {
			continue
		}
		for(const [t, w] of G[f]) {
			if(d + w < distance[t]) {
				distance[t] = d + w
				pq.push([t, distance[t]])
			}
		}
	}
	return distance
}
// 堆
class PriorityQueue {
  constructor(
    compare = (a, b) => a > b 
    ){
    this.data = []
    this.size = 0
    this.compare = compare
  }

  peek() {
    return this.size === 0 ? null : this.data[0] 
  }

  push(val) {
    this.data.push(val)
    this._shifUp(this.size++)
  }

  pop() {
    if(this.size === 0) { return null }
    this._swap(0, --this.size)
    this._shifDown(0)
    return this.data.pop()
  }

  _parent(index) {
    return index - 1 >> 1
  }
  
  _child(index) {
    return (index << 1) + 1
  }

  _shifDown(index) {
    while(this._child(index) < this.size) {
      let child = this._child(index)
      if(child + 1 < this.size 
        && this.compare(this.data[child + 1], this.data[child])) {
          child = child + 1
      }
      if(this.compare(this.data[index], this.data[child])){
        break
      }
      this._swap(index, child)
      index = child
    }
  }

  _shifUp(index) {
    while(this._parent(index) >= 0 
    && this.compare(this.data[index], this.data[this._parent(index)])) {
      this._swap(index, this._parent(index))
      index = this._parent(index)
    }
  }

  _swap(a, b) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]]
  }
}

export {
  createGraph,
  dijkstra
}