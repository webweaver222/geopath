export default class googleMaps {

    _map = null
    _infowindow = null
    _service = null

    constructor(map) {
        this._map = map
        this._service = new google.maps.places.PlacesService(map);
        this._infowindow = new google.maps.InfoWindow();
      }

    getService() {
        return this._service
    }

    getInfoWindow () {
        return this._infowindow
    }


    createMarker (place) {   
        var myLatlng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
        
        var marker = new google.maps.Marker({
          map: this._map,
          position: myLatlng,
          //draggable:true,
        });

        google.maps.event.addListener(marker, 'click', function() {
          this._infowindow.setContent(place.name);
          this._infowindow.open(this._map, this);
        });
      }

      findPlace({query, fields}) {
        this._service.findPlaceFromQuery({
            query,//: 'Israel, Rishon LeZion, Tabib 35',
            fields//: ['name', 'geometry'],
          }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
              }
              this._map.setCenter(results[0].geometry.location);
            }
          });
      }
   

    
}