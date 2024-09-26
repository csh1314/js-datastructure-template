
export const useSetState = (initialState) => {
  const [state, rawSetState] = useState(initialState)

  const stateRef = useRef(initialState)
  stateRef.current = state

  const setState = useCallback(
    (next, callback) => {
      if (typeof next === 'function') {
        rawSetState(next(stateRef.current))
      } else {
        rawSetState(Object.assign({}, stateRef.current, next))
      }
      setTimeout(callback)
    },
    []
  )

  return [state, setState]
}