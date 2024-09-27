function flatten(nums) {
  return nums.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return [...acc, ...flatten(cur)]
    }
    return [...acc, cur]
  }, [])
}

function flattenV2(nums, max = Infinity) {
  return nums.reduce((acc, cur) => {
    if (Array.isArray(cur) && max > 0) {
      return [...acc, ...flattenV2(cur, max - 1)]
    }
    return [...acc, cur]
  }, [])
}

console.log(flattenV2([1, [2, [3, 4 ,5], 6], 7], 1))