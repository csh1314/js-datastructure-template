/**
 * 树形dp: 求树的最大直径(路径)
 * 这里最大的直径可能不包含根结点
 */

/**
 * 建图 const graph: number[][]
 */
let ans = 0

function dfs(x) {
  let maxLen = 0
  for(const y of g[x]) {
    let len = dfs(y) + 1
    // 更新 ans
    ans = Math.max(ans, maxLen + len)
    maxLen = Math.max(maxLen, len)
  }
  return maxLen
}

