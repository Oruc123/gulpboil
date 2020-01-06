var map2, markers;

function gmap() {
  var latitude = $("#simple_map").attr("data-latitude");
  var longitude = $("#simple_map").attr("data-longitude");

  map2 = new GMaps({
    el: "#simple_map",
    zoom: 10,
    lat: latitude,
    lng: longitude,
    mapTypeControl: false,
    panControl: false,
    scaleControl: false,
    streetViewControl: false,
    zoomControl: true
  });
  markers = []; //some array

  $.each(map_json_data, function(i, v) {
    $marker = map2.addMarker({
      lat: v.lat,
      lng: v.lng,
      title: v.name,
      icon: v.img,
      click: function(e) {
        map2.setCenter(e.position.lat(), e.position.lng());
      }
    });
    markers.push($marker);
  });

  if (markers.length == 1) {
    map2.setCenter(markers[0].position.lat(), markers[0].position.lng());
  } else {
    map2.fitZoom();
  }

  $("#show_big_map_form").submit(function(e) {
    e.preventDefault();
    map2.removeMarkers();
    map2.cleanRoute();

    $.each(map_json_data, function(i, v) {
      $marker = map2.addMarker({
        lat: v.lat,
        lng: v.lng,
        title: v.name,
        icon: v.img
      });
    });

    GMaps.geocode({
      address: $("#show_big_map_type_adress")
        .val()
        .trim(),
      callback: function(results, status) {
        if (status == "OK") {
          var latlng = results[0].geometry.location;
          map2.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            draggable: true,
            title: results[0].formatted_address,
            infoWindow: {
              content:
                '<div style="overflow:hidden; max-width:150px;text-align:center;">' +
                results[0].formatted_address +
                "</div>"
            }
          });
          map2.fitZoom();

          $.each(map_json_data, function(i, v) {
            map2.drawRoute({
              origin: [v.lat, v.lng],
              destination: [latlng.lat(), latlng.lng()],
              travelMode: "driving",
              strokeColor: "#131540",
              strokeOpacity: 0.6,
              strokeWeight: 4
            });
          });
        }
      }
    });
  });
}

$(document).ready(function() {
  if ($("#simple_map").length > 0) {
    gmap();
  }
});

/* Map end */
