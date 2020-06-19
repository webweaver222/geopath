const initialState = {
    map: null,
    geocoder: null,
    input: '',
    list: null,
    
}

const updateList = (list, newItem) => {
  if (list === null) return [newItem]

  return [
    ...list,
    newItem
  ]
}

const reducer = (state , action) => {
    

    if (typeof state === 'undefined') {
        return initialState
      }


      switch(action.type) {
          case 'INIT_MAP' : {
            return {
                ...state,
                map: action.payload
            }
          }

          case 'INPUT_CHANGE' : {
            return {
              ...state,
              input: action.payload
            }
          }

          case 'ADDRESS_ENTER': {
            return {
              ...state,
              input: '',
              list: updateList(state.list, state.input)
            }
          }

          default:
            return state
      }
}

export default reducer