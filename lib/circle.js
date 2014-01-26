

angular.module("google-maps").directive("circle", [
  "$log", "$timeout", function ($log, $timeout) {

    "use strict";
    DEFAULTS = {};
    return {
      restrict: "ECA",
      require: "^googleMap",
      replace: true,
      scope: {
        center: "=center",
        radius: "=radius",
        clickable: "=",
        draggable: "=",
        editable: "=",
        geodesic: "=",
        icons: "=icons",
        visible: "="
      },
      link: function(scope, element, attrs, mapCtrl) {
        if (angular.isUndefined(scope.center) || scope.center === null) {
          $log.error("circle: no valid center attribute found");
          return;
        }
        return $timeout(function() {
          map = mapCtrl.getMap();
          $log.info(center);
          $log.info(map);
          opts = {center: new google.map.LatLng(scope.center.latitude, scope.center.longitude),
            radius: scope.radius,
            fillColor: white,
            fillOpacity: 1.0,
            map: map };
          circle = new google.maps.Circle(opts);
        });
      }
    };
  }
]);