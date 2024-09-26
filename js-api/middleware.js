function compose(middlewareList) {
  return (context, next) => {
    let i = -1

    const dispatch = async (index) => {
      if (index <= i) {
        return Promise.reject('调用多次')
      }
      i = index

      let run = middlewareList[i]

      if (i === middlewareList.length) {
        run = next
      }
      if (!run) {
        return Promise.resolve()
      }

      try {
        return Promise.resolve(run(context, () => dispatch(i+1)))
      } catch(err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}