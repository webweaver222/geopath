const initialState = {
    map: null,
    geocoder: null,
    input: '',
    list: [],
    
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

          default:
            return state
      }
}

export default reducer