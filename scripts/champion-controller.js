/**
* Drag-drop item code
* @author
* @version 0.0.5
* @copyright 2015
*/
(function() {

    // The AngularJS module.
    var app = angular.module('builds');

    /**
    * The item controller for managing champions.
    */
    app.controller('ChampionController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', 'ItemInteractivityService', function ($scope, $http, $log, ChartService, ItemService, ItemInteractivityService) {
        var controller = this;

        /**
        * Initializes the controller.
        */
        controller.init = function () {

        };

        // Initialize the controller
        controller.init();

    }]);

})();