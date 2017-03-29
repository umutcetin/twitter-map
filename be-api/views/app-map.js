function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.969555, lng: 29.0826403},
        zoom: 2
    });

    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [

                google.maps.drawing.OverlayType.RECTANGLE
            ]
        },
        rectangleOptions: {
            fillColor: '#ffbe00',
            fillOpacity: 0.2,
            strokeWeight: 1,
            clickable: false,
            editable: false,
            zIndex: 1
        }
    });
    drawingManager.setMap(map);


    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        if (event.type == google.maps.drawing.OverlayType.RECTANGLE) {

            //var bottomRight = new google.maps.LatLng(event.overlay.bounds.R.R, event.overlay.bounds.j.R);
            //var topLeft = new google.maps.LatLng(event.overlay.bounds.R.j, event.overlay.bounds.j.j);
            var rect = event.overlay.getBounds();

            console.log(rect.f);
            console.log(rect.b);

            var text = $("#textbox").val();

            alert(text +" "+rect.f.f +" "+ rect.f.b+" "+ rect.b.f+" "+ rect.b.b);


            $.ajax({
              url: 'http://localhost:3000/tweets/text/turk',
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'jsonp_callback',
              success: function (data) {
                console.log('success', data);
                for (var i = 0; i < data.length; i++) {

                    var marker = new google.maps.Marker({
                        map: map,
                        position: data[i].geometry.location
                    });
                }

              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error', errorThrown);
              }
            });
            function jsonp_callback (data){
                console.log('jsonp_callback:',data);
            }
            // $.ajax({
            //   url: 'http://localhost:28017/twitter2/tweets',
            //   type: 'GET',
            //   dataType: 'jsonp',
            //   jsonp: 'jsonp', // mongod is expecting the parameter name to be called "jsonp"
            //   //  "_id" : "58c647bc26f00b108ceff222",
            //   success: function (data) {
            //     console.log('success', data);
            //   },
            //   error: function (XMLHttpRequest, textStatus, errorThrown) {
            //     console.log('error', errorThrown);
            //   }
            // });


            var service = new google.maps.places.PlacesService(map);
            var request = {
                bounds: event.overlay.bounds,
                type: ['store']
            };
            service.nearbySearch(request, callback);

            function callback(results, status) {

                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {

                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[i].geometry.location
                        });
                    }
                }
            }
        }
    });


    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        if (event.type == google.maps.drawing.OverlayType.CIRCLE) {

            var r = event.overlay.radius
            var lat = event.overlay.center.lat()
            var lon = event.overlay.center.lng()

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: new google.maps.LatLng(lat, lon),
                radius: r,
                type: ['store']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        new google.maps.Marker({
                            map: map,
                            position: results[i].geometry.location
                        });

                    }
                }
            }
        }
    });
}
