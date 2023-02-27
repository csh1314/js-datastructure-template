/**
 * 拓扑排序 - Topological sorting
 * 在一个DAG(有向无环图)中, 我们将图中的顶点以线性方式进行排序，使得对于任何的顶点 u 到 v 的有向边 (u,v), 都可以有 u 在 v 的前面。
 * 拓扑排序的目标是将所有节点排序，使得排在前面的节点不能依赖于排在后面的节点。
 * see https://oi-wiki.org/graph/topo/
 * 维护入度为0的点
 * 该边删除后点 v 的入度变为 0，则将 v 放入 Stack 中。
 */

/**
 * @param {number} n 
 * @param {number[][]} adj 图, adj[u]表示u可到达的v的list
 * @param {number[]} degree 入度
 * @returns 
 */
function topoSort(n, adj, degree) {
  const res = []
  const stack = []
  for(let i = 0; i<n; i++) {
    if (degree[i] === 0) stack.push(i)
  }
  while (stack.length) {
    const cur = stack.pop()
    res.push(cur)
    for(const next of adj[cur]) {
      degree[next]--
      if (degree[next] === 0) {
        stack.push(next)
      }
    }
  }
  return res.length === n ? res : []
}


export default topoSort
