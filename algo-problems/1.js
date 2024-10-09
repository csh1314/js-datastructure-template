// 最长无重复子串

// 求长度
function lengthOfLongestSubstring(s) {
  const n = s.length
  const map = new Map()
  let ans = 0
  for (let i = -1, j = 0; j<n; j++) {
      if (map.has(s[j])) {
          i = Math.max(i, map.get(s[j]))
      }
      map.set(s[j], j)
      ans = Math.max(ans, j - i)
  }
  return ans
};


// 求子串
function longestSubstring(s) {
  const n = s.length
  const map = new Map()
  let maxLen = 0, start = 0
  let i = -1
  for (let j = 0; j<n; j++) {
    if (map.has(s[j])) {
      i = Math.max(i, map.get(s[j]))
    }
    map.set(s[j], j)
    if (j - i > maxLen) {
      maxLen = j - i
      start = i+1
    }
  }
  return s.slice(start, start + maxLen)
};


const { log } = console
const cases = [
  'abcabcbb', // 3 abc
  'bbbbb', // 1 b
  'pwwkew', // 3 wke
]

cases.forEach(s => {
  log(lengthOfLongestSubstring(s), longestSubstring(s))
})