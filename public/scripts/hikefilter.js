$("#submit").click(function(event) {
  window.location = "../views/second.html"
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

var results=[]
var resultCoords=[]

$.grep(data, function(n, i){
    if(n.routes[0].length<length && n.routes[0].elevationGain<gain && n.routes[0].class<exposure && n.routes[0].TWDaccess<access){
      results.push(n)
      resultCoords.push(n.coordinates)
      console.log(n.mountain);
    }
})

var map;

function initMap (){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.74, lng: -106.4},
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
  });
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address},function(results, status){
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    var homeMarker = "../images/home.png"
    var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,
      icon: homeMarker,
      title: "Input_Address"
    });
  });
  var peakMarker = '../images/peak.png';
  for (var i = 0; i < resultCoords.length; i++) {
    var lat = parseFloat(resultCoords[i].slice(0,7))
    var long = parseFloat(resultCoords[i].slice(9,17))*-1
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: long},
      map: map,
      icon: peakMarker,
      title: "Results",
      mountain: (results[i].mountain).replace(/_/g, " "),
      routeName: (results[i].routes[0].name).replace(/_/g, " "),
      routeLength: results[i].routes[0].length,
      routeDifficulty: (results[i].routes[0].difficulty).replace(/_/g," "),
      routeDays: results[i].routes[0].days,
      routeFishing: results[i].routes[0].fishing,
      routeTrailhead: results[i].routes[0].trailhead.replace(/_/g," "),
      website: results[i].routes[0].website,

    })
    var infoWindow = new google.maps.InfoWindow({
      maxWidth: 200,
    });
    google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(
              "<p><b>"+this.mountain+"</b><br>"+
              "Route Name: "+this.routeName+"<br>"+
              "Difficulty: "+this.routeDifficulty+"<br>"+
              "Length: "+this.routeLength+"<br>"+
              "Days: "+this.routeDays+"<br>"+
              "Fishing: "+this.routeFishing+"<br>"+
              "Trailhead: "+this.routeTrailhead+"<br>"+
              "<a href='"+this.website+"' target='_blank'>"+"More Information"+"</a><br>"+
              "</p>"
          );
            infoWindow.open(map, this);
    });
  }

}
