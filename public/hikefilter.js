var data = [
  {
    "mountain": "Capitol_Peak",
    "elevation" : 14130,
    "heightRank" : 29,
    "coordinates" : "39.1503+-107.0831",
    "routes" : [{
        "name" : "Northeast_Ridge",
        "length" : 17,
        "days" : 2,
        "difficulty" : "Most_Difficult",
        "class" : 4,
        "elevationGain" : 5300,
        "trailhead" : "Capitol_Creek",
        "thCoord" : "39.2342+-107.0795",
        "camping" : true,
        "fishing" : true,
        "permitRequired" : false,
        "TWDaccess": true,
      }]
  },
  {
    "mountain" : "Little_Bear_Peak",
    "elevation" : 14037,
    "heightRank" : 44,
    "coordinates" : "37.5667+-105.4972",
    "routes" : [{
        "name" : "West_Ridge",
        "length" : 14,
        "days" : 2,
        "difficulty" : "Most_Difficult",
        "class" : 4,
        "elevationGain" : 6200,
        "trailhead" : "Lake_Como",
        "thCoord" : "37.5633+-105.5486",
        "camping" : true,
        "fishing" : true,
        "Permit Required" : false,
        "TWDaccess": true,
      }]
  },
  {
    "mountain" : "Pyramid_Peak",
    "elevation" : 14018,
    "heightRank" : 47,
    "coordinates" : "38.8450+-120.1578",
    "routes" : [{
        "name" : "Northeast Ridge",
        "length" : 8.25,
        "days" : 1,
        "difficulty" : "Most_Difficult",
        "class" : 4,
        "elevationGain" : 4500,
        "trailhead" : "Maroon_Lake",
        "thCoord" : "39.0989+-106.9391",
        "camping" : true,
        "fishing" : true,
        "Permit Required" : true,
        "TWDaccess": true,
      }]
  },
  {
    "mountain" : "North_Maroon_Peak",
    "elevation" : 14014,
    "heightRank" : "Unranked",
    "coordinates" : "39.0761+-106.9867",
    "routes" : [{
        "name" : "Northeast_Ridge",
        "length" : 9.25,
        "days" : 1,
        "difficulty" : "Most_Difficult",
        "class" : 4,
        "elevationGain" : 4500,
        "trailhead" : "Maroon_Lake",
        "thCoord" : "39.0989+-106.9391",
        "camping" : true,
        "fishing" : true,
        "Permit Required" : false,
        "TWDaccess" : true,
      }]
  },
  {
    "mountain" : "Mt._Wilson",
    "elevation" : 14246,
    "heightRank" : 16,
    "coordinates" : "34.2239+-118.0612",
    "routes" : [{
        "name" : "North_Slopes",
        "length" : 11,
        "days" : 1,
        "difficulty" : "Most_Difficult",
        "class" : 4,
        "elevationGain" : 5300,
        "trailhead" : "Rock_of_Ages",
        "thCoord" : "37.8834+-108.0183",
        "camping" : false,
        "fishing" : false,
        "Permit Required" : false,
        "TWDaccess" : true,
      }]
  },
  {
    "mountain" : "Crestone_Needle",
    "elevation" : 14197,
    "heightRank" : 19,
    "coordinates" : "37.9647, 105.5767",
    "routes" : [{
        "name" : "South_Face",
        "length" : 12,
        "days" : 2,
        "difficulty" : "Most_Difficult",
        "class" : 3,
        "elevationGain" : 4400,
        "trailhead" : "South_Colony_Lakes",
        "thCoord" : "37.976072+-105.506739",
        "camping" : true,
        "fishing" : true,
        "Permit Required" : false,
        "TWDaccess" : false,
      }]
  },
  {
    "mountain" : "Sunlight Peak",
    "elevation" : 14059,
    "heightRank" : 39,
    "coordinates" : "37.6272+-107.5959",
    "routes" : [{
        "name" : "South_Face",
        "length" : 17,
        "days" : 2,
        "difficulty" : "Most_Difficult",
        "class" : 4,
        "elevationGain" : 6000,
        "trailhead" : "Needleton",
        "thCoord" : "37.633372+-107.692586",
        "camping" : true,
        "fishing" : true,
        "Permit Required" : false,
        "TWDaccess": true,
      }]
  }
]

$("#submit").click(function() {
  window.location = "second.html"
});

// var request = $.get("https://lit-fortress-6467.herokuapp.com/object", function(data, status){})

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

    console.log(length);
    console.log(gain);
    console.log(exposure);
    console.log(address);
    console.log(access);

// n.routes[0].TWDaccess==access

console.log(data[0].routes[0].TWDaccess);

var results=[]
var resultCoords=[]

$.grep(data, function(n, i){
    if(n.routes[0].length<length && n.routes[0].elevationGain<gain && n.routes[0].class<exposure && n.routes[0].TWDaccess==access){
      results.push(n)
      resultCoords.push(n.coordinates)
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
