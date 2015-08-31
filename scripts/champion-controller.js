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
    app.controller('ChampionController', ['$scope', '$http', '$log', 'ChampionService', 'ChampionInteractivityService', 'SoundEffectService',
        function ($scope, $http, $log, ChampionService, ChampionInteractivityService, SoundEffectService) {
        var controller = this;

        /**
        * Initializes the controller.
        */
        controller.init = function () {
            // Setup the search completion
            var autoComplete = $("#champSearch").autocomplete({
                source: ChampionService.getChampionSearchKeys(),
                minLength: 2,
                select: function (event, ui) {
                    return false;
                }
            }).autocomplete("instance");

            // Renders the items in the search completion
            autoComplete._renderItem = function (div, id) {
                return div.append(ChampionService.getChampionImageById(id, "search-champ-image"));
            };

            // Renders the menu of the search completion
            autoComplete._renderMenu = function (ul, champs) {
                var that = this;
                var champDiv = $("#searchChamps");
                champDiv.empty();
                //ul.append($("<li class='champ-search-autocomplete'><div>"));
                $.each(champs, function (index, champ) {
                    var ids = champ.value.split(",");
                    $.each(ids, function(i, id){
                        if ($("[data-champ-id='" + id + "']", ul).length <= 0)
                            that._renderItemData(champDiv, id);
                    });
                });
                $("#allChamps").attr("style", "display: none;");
                $("#searchChamps").removeAttr("style");
                controller.addClickHandler($(".search-champ-image"));
                ChampionInteractivityService.addHoverToolTip($(".search-champ-image"));
            };

            // Resizes the menu of the search completion
            autoComplete._resizeMenu = function () {
                var width = $("#champSearch").outerWidth();
                this.menu.element.outerWidth(width);
            };

            // Handle when the value changes in the search box
            $("#champSearch").keyup(function () {
                var champ = $("#champSearch").val()
                if (champ == null || champ == undefined || champ.trim() == "" || champ.length < 2) {
                    $("#searchChamps").empty();
                    $("#allChamps").removeAttr("style");
                    $("#searchChamps").attr("style", "display: none;");
                }
            });
        };

        controller.addClickHandler = function (selector) {
            selector.click(function () {
                var button = $(this);
                var id = button.attr("data-champ-id");
                var champ = ChampionService.getChampion(id);
                SoundEffectService.playSoundBite("click");
                $("#buildTab a").text("Build - " + champ.name);
                controller.getBuilds(id);
                $("#buildTabLink").click();
            });
        };

        /**
        * Handler for when all the champions have been added to the champion store repeater.
        */
        $scope.$on('ngChampionRepeatFinished', function (ngRepeatFinishedEvent) {
            controller.addClickHandler($(".champ-panel > .champ-image"));
            ChampionInteractivityService.addHoverToolTip($(".champ-panel > .champ-image"));
        });

        controller.getChampions = function () {
            return ChampionService.getChampions();
        };

        controller.getBuilds = function (id) {
            var request = $.ajax({
                url: "src/index.php",
                method: "POST",
                data: { "action": "getChampBuilds", "id": id },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                },
                error: function () {
                    console.log("Error");
                }
            });
        };

        // Initialize the controller
        controller.init();

    }]);

    /**
    * The champion directive for handling actions taken after each champion is added to the store.
    */
    app.directive('storeChampionDraggable', function ($timeout) {
        function link(scope, element, attrs) {
            var el = angular.element(element);

            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngChampionRepeatFinished');
                });
            }
        }
        return {
            restrict: 'A',
            link: link
        };
    });

})();