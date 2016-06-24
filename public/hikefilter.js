$("#submit").click(function() {
  window.location = "second.html"
});

var x = location.search
var spl = x.split("=")
var y =[]
for (var i = 0; i < spl.length; i++) {
    y.push(spl[i].split("&"))
}

var length = y[1][0];
var gain = y[2][0];
var exposure = y[3][0];
var address = (y[4][0]).replace(/%2C/,"")
var access = y[5][0];

console.log(access);
var results=[]
var resultCoords=[]

$.grep(data, function(n, i){
    if(n.routes[0].length<length && n.routes[0].elevationGain<gain && n.routes[0].class<exposure && n.routes[0].TWDaccess<access){
      results.push(n)
      resultCoords.push(n.coordinates)
      console.log(n.mountain);
    }
})
console.log(results);
console.log(resultCoords);
var map;
function initMap (){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.0567377, lng: -105.2778153},
    zoom: 7
  });
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address},function(results, status){
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,
      title: "Input_Address"
    });
  });

  for (var i = 0; i < resultCoords.length; i++) {
    var lat = parseFloat(resultCoords[i].slice(0,7))
    var long = parseFloat(resultCoords[i].slice(9,17))*-1
    console.log(lat+", "+long);
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: long},
      map: map,
      title: "Results"
    })
  }
}
