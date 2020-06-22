const geocode = (adress) => (dispatch, getState) => {
    const { gms } = getState()


    gms.findPlace({
        query: adress,
        fields: ['name', 'geometry'],
    }).then(marker => {
        dispatch({
            type: 'ADDRESS_ADD',
            name: adress,
            lat: marker.position.lat(),
            lng: marker.position.lng()
        })

        let initLat = 0;
        let initLng = 0

        google.maps.event.addListener(marker, 'dragstart', () => {
            initLat = marker.position.lat()
            initLng = marker.position.lng()

        })

        google.maps.event.addListener(marker, 'dragend', () => {
            const lat = marker.position.lat()
            const lng = marker.position.lng()

            gms.reverse_geocode(lat, lng).then(place => {

                google.maps.event.addListener(marker, 'click', () => {
                    gms.getInfoWindow().setContent(place.formatted_address);
                    gms.getInfoWindow().open(gms.getMap(), marker);
                  });

                dispatch({
                    type: 'MARKER_DRAG_END',
                    initLat,
                    initLng,
                    lat,
                    lng,
                    name: place.formatted_address
                })
            })
        })
    })
}





export {
    geocode
}