/**
 * 有向图找循环依赖
 * input demo: [[1,2],[2,3],[1,4],[3,5],[5,1]]
 * output demo: [[1,2,3,5]]
 */

/**
 * DFS 做法 
 */
function findCycles(input) {
  const graph = new Map()
  for (const [a, b] of input) {
    if (!graph.has(a)) {
      graph.set(a, [])
    }
    graph.get(a).push(b)
  }

  const cycles = []

  const seen = new Set()
  function dfs(node, path = []) {
    if (seen.has(node)) {
      const existIndex = path.indexOf(node)
      if (existIndex !== -1) {
        const cycle = path.slice(0)
        const sortedUniqueStr = [...cycle].sort((a, b) => a - b).join('#')
        const isDuplicate = cycles.some(c => [...c].sort((a, b) => a - b).join('#') === sortedUniqueStr)
        if (!isDuplicate) {
          cycles.push(cycle)
        }
      }
      return
    }
    seen.add(node)
    path.push(node)
    for (const next of graph.get(node) || []) {
      dfs(next, path)
    }
    path.pop()
  }

  for (const node of graph.keys()) {
    !seen.has(node) && dfs(node)
  }

  return cycles.map(c => [...c, c[0]])
}

// test code
const cases = [
  [[1,2],[2,3],[1,4],[3,5],[5,1]],
  [[1,2],[2,3],[1,4],[3,5],[5,1], [3,1]],
  [[1,2],[2,3],[3,4],[4,5],[5,1]],
  [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,1]],
  [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,1]],
]


/**
 * TODO: 拓扑排序
 */

cases.forEach(input => {
  console.log(findCycles(input))
})