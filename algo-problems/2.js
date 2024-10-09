// 最长上升子序列

// dp做法
function lengthOfLIS(nums) {
  const n = nums.length
  const dp = new Array(n).fill(1)
  for (let j = 1; j<n; j++) {
    for (let i = 0; i<n; i++) {
      if (nums[j] > nums[i]) {
        dp[j] = Math.max(dp[i] + 1, dp[j])
      }
    }
  }
  return Math.max(...dp)
}


// 贪心 + 二分
function lengthOfLIS_v2(nums) {
  const n = nums.length
  const LIS = [nums[0]]
  for (let i = 1; i<n; i++) {
    if (nums[i] > LIS[LIS.length-1]) {
      LIS.push(nums[i])
    } else {
      let l = 0, r = LIS.length - 1
      while (l < r) {
        const m = Math.floor((l+r)/2)
        if (LIS[m] >= nums[i]) {
          r = m
        } else {
          l = m +1
        }
      }
      LIS[l] = nums[i]
    }
  }
  return LIS.length
}



const { log } = console
const cases = [
  [10,9,2,5,3,7,101,18], // 4  [2,3,7,101]
  [0,1,0,3,2,3], // 4 [0,1,2,3]
  [7,7,7,7,7,7,7], // 1 [7]
]

cases.forEach(c => {
  log(lengthOfLIS(c), lengthOfLIS_v2(c))
})