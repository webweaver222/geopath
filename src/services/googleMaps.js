export default class googleMaps {

    _map = null
    _infowindow = null
    _service = null
    _geocoder = null



    constructor(map) {
        this._map = map
        this._service = new google.maps.places.PlacesService(map);
        this._infowindow = new google.maps.InfoWindow();
        this._geocoder = new google.maps.Geocoder;
      }

    getService() {
        return this._service
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

        google.maps.event.addListener(marker, 'dragend', () => {
          console.log(marker.position.lat());
          console.log(marker.position.lng())
        })

        this._geocoder.geocode({'location': new google.maps.LatLng(50.460592153121155, 29.534630468750002)}, (results, status) => {
          if (status === 'OK') {
            console.log(results);
          }
        })

        return marker

        /*google.maps.event.addListener(marker, 'click', () => {
          this._infowindow.setContent(place.name);
          this._infowindow.open(this._map, marker);
        });*/
      }

      findPlace({query, fields = ['name', 'geometry']}) {
        return new Promise(resolve => {
          this._service.findPlaceFromQuery({
            query,
            fields
          }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              //for (var i = 0; i < results.length; i++) {
                const marker = this.putMarkerOnMap(results[0]);
              //}
              this._map.setCenter(results[0].geometry.location);

              resolve(marker)
            }
          });
        })
       
      }


      connectMarkers(list) {
        const coordinates = []
        list.forEach((address, i) => {
          this._service.findPlaceFromQuery({
            query: address,
            fields: ['name', 'geometry']
          }, results => {
              coordinates.push(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()))
              if (coordinates.length === list.length) {

                const pl = new google.maps.Polyline({
                  path: coordinates,
                  strokeColor: '#FF0000',
                  strokeOpacity: 1.0,
                  strokeWeight: 2
                })

                pl.setMap(this._map);
        
              }
          })
        })
      }
   

    
}