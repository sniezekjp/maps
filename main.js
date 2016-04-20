$(document).ready(function() {
    // execute
    (function() {
        // map options
        var options = {
            center: new google.maps.LatLng(39.909736, -98.522109), // centered US
            mapTypeControl: false
        };

        // init map
        var geocoder = new google.maps.Geocoder();
        var map = new google.maps.Map(document.getElementById('map_canvas'), options);
        var bounds = new google.maps.LatLngBounds();

        // NY and CA sample Lat / Lng
        var southWest = new google.maps.LatLng(40.744656, -74.005966);
        var northEast = new google.maps.LatLng(34.052234, -118.243685);
        var lngSpan = northEast.lng() - southWest.lng();
        var latSpan = northEast.lat() - southWest.lat();

        var addresses = [];
        var markers = [];
        var mapAddress = function(info) {
            geocoder.geocode(info, function(results, status) {
                if(status !== google.maps.GeocoderStatus.OK || status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                    return;
                }
                
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: info.address,
                });
                markers.push(marker);

                bounds.extend(results[0].geometry.location);
                map.fitBounds(bounds);
            });
        };

        var hideAddresses = function() {
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
        };

        var showAddresses = function() {
            markers.forEach(function(marker) {
                marker.setMap(map);
            });
        };

        var initAddresses = function() {
            mapAddress({
                address: '100 Congress Ave, Austin, TX 78701'
            });

            mapAddress({
                address: '201 Colorado Street Austin, TX 78701'
            });

            mapAddress({
                address: '208 West 4th Street, Austin, TX 78701'
            });    

            mapAddress({
                address: 'E 6th St, Austin, TX 78701'
            });    

            mapAddress({
                address: '1522 South Congress Avenue, Austin, TX 78704'
            });    

            mapAddress({
                address: '3201 S Lamar Boulevard, Austin, TX 78704'
            });   
        };

        initAddresses();

        $('form').submit(function(e) {
            e.preventDefault();
            var address = $('#address').val();
            var info = {
                address: address
            };
            mapAddress(info);
            $('#address').val('');
        });

        var show = true;
        $('.toggle').click(function(e) {
            e.preventDefault();
            var action = show ? hideAddresses : showAddresses;
            action();
            show = !show;
        });
    })();
});