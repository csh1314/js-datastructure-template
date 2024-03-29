// 在nums中查找第一个 > target的index
const upper_bound = (nums, target) => {
  let l = 0, r = nums.length-1
  while(l < r){
    let m = Math.floor((l+r)/2)
    if(nums[m] > target){
      r = m
    }else{
      l = m+1
    }
  }
  return l
}

// 在nums中查找第一个 >= target的index
const lower_bound = (nums, target) => {
  let l = 0, r = nums.length-1
  while(l < r){
    let m = Math.floor((l+r)/2)
    if(nums[m] >= target){
      r = m
    }else{
      l = m+1
    }
  }
  return l
}

export {
  upper_bound,
  lower_bound
}