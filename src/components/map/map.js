import React, {useEffect , useState, useRef} from 'react'
import {connect} from 'react-redux'

import {compose, seDidUpdateEffect} from '../../utils'
import withGoogleMapsService from '../hoc/withGoogleMapsService'

import './map.sass'


const Map = ({onMapInit, googleMapsService , list}) => {
    

    const [mapsService, setMapsService] = useState({});
    

    const initMap = ( ) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(
                    new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: {lat: -34.397, lng: 150.644}
                }))
            }, 0)
        });
    }


    useEffect(() => {
        initMap().then(map => {

           setMapsService(new googleMapsService(map))


       
          })  
    }, [])




    useEffect(() => {
      if (list) 
      mapsService.findPlace({
        query: list[list.length -1],
        fields: ['name', 'geometry'],
      })
    
    }, [list])

    return (
        <div id="map"></div>
    )
}
 


const mapStateToProps = ({map, list}) => {
  return {
      map,
      list
      
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
