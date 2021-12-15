// 求最大公约数
const gcd = (x, y) => {
  if(y === 0) return x
  return gcd(y, x%y)
}

// 求最小公倍数
const scm = (x, y) => {
  return (x * y)/gcd(x,y)
}

