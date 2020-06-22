export default class googleMaps {

    _map = null
    _infowindow = null
    _service = null
    _geocoder = null
    _pl = null
    _markers = []



    constructor(map) {
        this._map = map
        this._service = new google.maps.places.PlacesService(map);
        this._infowindow = new google.maps.InfoWindow();
        this._geocoder = new google.maps.Geocoder;
      }

    getService() {
        return this._service
    }

    getMap() {
      return this._map
    }

    getInfoWindow () {
        return this._infowindow
    }

    findPlace({query, fields = ['name', 'geometry']}) {
      return new Promise(resolve => {
        this._service.findPlaceFromQuery({
          query,
          fields
        }, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
  
              this._map.setCenter(results[0].geometry.location);

              resolve(results[0])
          }
        });
      })
    }

      reverse_geocode(lat, lng) {
        return new Promise(resolve => {
          this._geocoder.geocode({'location': new google.maps.LatLng(lat, lng)}, (results, status) => {
            if (status === 'OK') {
                resolve(results[0])
            }
        })
        })
      }
    
      putMarkers(list, toDispatch) {
          this._markers.forEach(marker => marker.setMap(null))
          this._markers = []

          let initLat = 0;
          let initLng = 0

          list.forEach(address => {
            var marker = new google.maps.Marker({
              map: this._map,
              position: new google.maps.LatLng(address.lat, address.lng),
              draggable:true,
            })

          this._markers.push(marker)

            google.maps.event.addListener(marker, 'click', () => {
              this._infowindow.setContent(address.name);
              this._infowindow.open(this._map, marker);
            });

            google.maps.event.addListener(marker, 'dragstart', () => {
              initLat = marker.position.lat()
              initLng = marker.position.lng()
            })


            google.maps.event.addListener(marker, 'dragend', () => {
              const lat = marker.position.lat()
              const lng = marker.position.lng()
  
              this.reverse_geocode(lat, lng).then(place => {
  
                toDispatch({
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

      connectMarkers(list) {
        const coordinates = []
        if (this._pl) this._pl.setMap(null);
        list.forEach(address => {
              coordinates.push(new google.maps.LatLng(address.lat, address.lng))
              if (coordinates.length === list.length) {

                 this._pl = new google.maps.Polyline({
                  path: coordinates,
                  strokeColor: '#FF0000',
                  strokeOpacity: 1.0,
                  strokeWeight: 2
                })

                this._pl.setMap(this._map);
        
              }
          })
        }
      
   

    
}