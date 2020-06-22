export default class googleMaps {

    _map = null
    _infowindow = null
    _service = null
    _geocoder = null
    _pl = null



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


    putMarkerOnMap (place) {   
        var myLatlng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
        
        var marker = new google.maps.Marker({
          map: this._map,
          position: myLatlng,
          draggable:true,
        });

        google.maps.event.addListener(marker, 'click', () => {
          this._infowindow.setContent(place.name);
          this._infowindow.open(this._map, marker);
        });
      
        return marker
      }

      findPlace({query, fields = ['name', 'geometry']}) {
        return new Promise(resolve => {
          this._service.findPlaceFromQuery({
            query,
            fields
          }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const marker = this.putMarkerOnMap(results[0]);
    
                this._map.setCenter(results[0].geometry.location);

                resolve(marker)
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