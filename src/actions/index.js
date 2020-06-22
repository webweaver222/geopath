const geocode = (adress) => (dispatch, getState) => {
    const { gms } = getState()


    gms.findPlace({
        query: adress,
        fields: ['name', 'geometry'],
    }).then(place => {
        dispatch({
            type: 'ADDRESS_ADD',
            name: adress,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        })
    })
}

    export {
        geocode
    }
