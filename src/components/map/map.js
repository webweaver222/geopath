import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {compose} from '../../utils'
import withGoogleMapsService from '../hoc/withGoogleMapsService'

import './map.sass'


const Map = ({onMapInit, googleMapsService}) => {
    

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
          
            //onMapInit(map)

            const mapsService = new googleMapsService(map)

            mapsService.findPlace({
              query: 'Israel, Ramat-Gan, Herzl 52',
              fields: ['name', 'geometry'],
            })

       
          })
        
    }, [])

    return (
        <div id="map"></div>
    )
}
 


const mapStateToProps = ({map}) => {
  return {
      map
      
  }
} 

const mapDispatchToProps = (dispatch, {service}) => {
  //console.log(service);
  return {
      onMapInit: (map) => dispatch({type:'INIT_MAP', payload: map})
  }
}

export default compose(
  withGoogleMapsService,
  connect(mapStateToProps, mapDispatchToProps)
)(Map)
