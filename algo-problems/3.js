// 回文串相关

// 回文串的个数
function countSubstrings(s) {
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(false))
  let ans = 0
  for (let j = 0; j<n; j++) {
      for (let i = 0; i<=j; i++) {
          if(i === j || (j-i === 1 && s[i] === s[j])){
              // len = 1 or 2
              dp[i][j] = true
              ans++
          }
          else if(j-i > 1 && s[i] === s[j] && dp[i+1][j-1]){
              // len > 2
              dp[i][j] = true
              ans++
          }
      }
  }
  return ans
};

// 求最长回文子串 (连续的)
function longestPalindrome(s) {
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(false))
  for (let i = 0; i<n; i++) {
      // len = 1
      dp[i][i] = true
  }
  let maxLen = n > 0 ? 1 : 0
  let startIndex = 0
  for (let r = 1; r<n; r++) {
      for (let l = 0; l<r; l++) {
          if (r - l === 1 && s[l] === s[r]) {
              // len = 2
              dp[l][r] = true
          } else if (r - l > 1 && s[l] === s[r]) {
              // len > 2
              dp[l][r] = dp[l+1][r-1]
          }
          if (dp[l][r] && r-l+1 > maxLen) {
              maxLen = r-l+1
              startIndex = l
          }
      }
  }
  return s.slice(startIndex, startIndex+maxLen)
};


// 求最长回文子序列长度 (可以不连续)
function longestPalindromeSubseq(s) {
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i<n; i++) {
      // len = 1
      dp[i][i] = 1
  }

  for (let i = n-1; i>=0; i--) {
      for (let j = i+1; j<n; j++) {
          if (s[i] === s[j]) {
              dp[i][j] = dp[i+1][j-1] + 2
          } else {
              dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1])
          }
      }
  }
  
  return dp[0][n-1]
};