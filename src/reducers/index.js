const initialState = {
    gms: null,
    geocoder: null,
    input: '',
    list: null,
    
}

const updateList = (list, newAdress, idx) => {
  if (list === null) return [
   {
    ...newAdress,
    id: 0
   }
  ]

  if (newAdress === 'remove') {
    return [
      ...list.slice(0, idx),
      ...list.slice(idx+1)
    ]
  }

  if (typeof idx === 'number') {
    return [
      ...list.slice(0, idx),
      newAdress,
      ...list.slice(idx+1)
  ]
  }


  return [
    ...list,
    {
      id:  Math.max(...list.map(p => p.id), 0) + 1,
      ...newAdress
    }
  ]
}

const reducer = (state , action) => {
    

    if (typeof state === 'undefined') {
        return initialState
      }

const {list} = state

      switch(action.type) {
          case 'INIT_MAP' : {
            return {
                ...state,
                gms: action.payload
            }
          }

          case 'INPUT_CHANGE' : {
            return {
              ...state,
              input: action.payload
            }
          }

          case 'ADDRESS_ADD': {

            const newAdrress = {
                name: action.name,
                lat: action.lat,
                lng: action.lng,
            }

            return {
              ...state,
              input: '',
              list: updateList(list, newAdrress, undefined)
            }
          }

          case 'MARKER_DRAG_END' : {
            
            const {initLat, initLng, lat, lng, name} = action

            const idx = list.findIndex(place => place.lat === initLat && place.lng === initLng)

            const newAdrress = {
              id: list[idx].id,
              name,
              lat,
              lng
          }


            return {
              ...state,
              list: updateList(list, newAdrress, idx)
            }

          }

          case 'DND_END': {
              return {
                ...state,
                list: action.payload
              }
          }

          case 'DELETE_ITEM' : {
            return {
              ...state,
              list: updateList(list, 'remove', action.payload)
            }
          }

          default:
            return state
      }
}

export default reducer