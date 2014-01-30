

angular.module("google-maps").directive("circle", [
  "$log", "$timeout", function ($log, $timeout) {

    var DEFAULTS = {};
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
        visible: "=",
        strokeColor: "=",
        strokeOpacity: "=",
        strokeWeight: "=",
        fillColor: "=",
        fillOpacity: "="
      },
      link: function(scope, element, attrs, mapCtrl) {
        if (angular.isUndefined(scope.center) || scope.center === null) {
          $log.error("circle: no valid center attribute found");
          return;
        }
        return $timeout(function() {
          var map = mapCtrl.getMap();
          $log.info(scope.center);
          $log.info(map);
          opts = {center: new google.maps.LatLng(scope.center.latitude, scope.center.longitude),
            radius: scope.radius,
            strokeColor: scope.strokeColor || '#F00',
            strokeOpacity: scope.strokeOpacity || 0.8,
            fillColor: scope.fillColor || '#F00',
            fillOpacity: scope.fillOpacity || 0.35,
            map: map };
          circle = new google.maps.Circle(opts);
          if (angular.isDefined(scope.editable)) {
            scope.$watch("editable", function(newValue, oldValue) {
              return circle.setEditable(newValue);
            });
          }
          if (angular.isDefined(scope.draggable)) {
            scope.$watch("draggable", function(newValue, oldValue) {
              return circle.setDraggable(newValue);
            });
          }
          if (angular.isDefined(scope.visible)) {
            scope.$watch("visible", function(newValue, oldValue) {
              return circle.setVisible(newValue);
            });
          }
          if (angular.isDefined(scope.radius)) {
            scope.$watch("radius", function(newValue, oldValue) {
              return circle.setRadius(newValue);
            });
          }
        });
      }
    };
  }
]);