import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {compose} from '../../utils'
import withGoogleMapsService from '../hoc/withGoogleMapsService'

import './map.sass'


const Map = ({onMapInit, googleMapsService , list, gms, toDispatch}) => {
    


    const initMap = ( ) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(
                    new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: {lat: -34.397, lng: 150.644}
                }))
            }, 1000)
        });
    }


    useEffect(() => {
        initMap().then(map => {
           onMapInit(new googleMapsService(map))
          })  
    }, [])




    useEffect(() => {
      if (list) {
        gms.putMarkers(list, toDispatch)
        gms.connectMarkers(list)
      }
    }, [list])

    return (
        <div id="map"></div>
    )
}
 


const mapStateToProps = ({list, gms}) => {
  return {
      list,
      gms
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
      onMapInit: (gms) => dispatch({type:'INIT_MAP', payload: gms}),
      onPutMarker: (lat, lng) => dispatch({type:'PUT_MARKER', lat, lng}),
      toDispatch: (args) => dispatch(args)
  }
}


export default compose(
  withGoogleMapsService,
  connect(mapStateToProps, mapDispatchToProps)
)(Map)
