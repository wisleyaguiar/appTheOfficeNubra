/**
 * Created by wisleyaguiar on 24/11/15.
 */
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var endPartida;

function initialize() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            /*pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(pontoPadrao);*/

            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({
                    "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        endPartida = results[0].formatted_address;
                    }
                });
        });
    }

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

    /*directionsDisplay.setPanel(document.getElementById("trajeto-texto"));*/

    /**/
}

initialize();

$("#btTracarRota").click(function(event) {
    event.preventDefault();

    var enderecoChegada = "R. Frei Caneca, 558 - Consolação, São Paulo - SP, 01307-001";

    var request = {
        origin: endPartida,
        destination: enderecoChegada,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
});