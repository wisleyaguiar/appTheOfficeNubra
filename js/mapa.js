/**
 * Created by wisleyaguiar on 24/11/15.
 */
document.addEventListener("deviceready", GetGeoLocation , false);

var map;
var directionsDisplay;
//var directionsService = new google.maps.DirectionsService();
//var endPartida;

function initialize() {

    directionsDisplay = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(-23.5535238, -46.6539797);

    var options = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("gerarMapa"), options);
    directionsDisplay.setMap(map);

    // variável que define as opções do marcador
    var marker = new google.maps.Marker({
        position: latlng, // variável com as coordenadas Lat e Lng
        map: map,
        title:"The Office Frei Caneca Nubra"
    });
}

function GetGeolocation()
{
    var options = { timeout: 30000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(GetPosition, PositionError, options);
}

function GetPosition(position)
{
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    ReverseGeocode(latitude,longitude);   // Pass the latitude and longitude to get address.
}

function PositionError() {
    alert('Could not find the current location.');
}

function ReverseGeocode(latitude, longitude){
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                var endPartida = results[0].formatted_address;

                var enderecoChegada = "R. Frei Caneca, 558 - Consolação, São Paulo - SP, 01307-001";

                var request = {
                    origin: endPartida,
                    destination: enderecoChegada,
                    travelMode: google.maps.TravelMode.DRIVING
                };

                var directionsService = new google.maps.DirectionsService();

                directionsService.route(request, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(result);
                    }
                });
            }
            else {
                alert('Unable to detect your address.');
            }
        } else {
            alert('Unable to detect your address.');
        }
    });
}

$("#btTracarRota").click(function(event) {
    event.preventDefault();
    GetGeolocation();
});