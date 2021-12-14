// 快速幂求 x**y   BigInt版
const pow = (x, y, mod) => {
  let ans = 1n
  while(y) {
      if(y & 1n){
          ans = ans * x % mod
      }
      x = x * x % mod
      y >>= 1n
  }
  return ans
}