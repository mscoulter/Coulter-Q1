$(document).ready(function(){

    $("#submit").click(function() {
    window.location = "second.html"
    })
})

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
var access = y[6][0];

console.log(length);
console.log(gain);
console.log(exposure);
console.log(address);
console.log(access);


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
    console.log(latitude);
  })

}
