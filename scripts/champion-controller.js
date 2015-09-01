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
    app.controller('ChampionController', ['$scope', '$http', '$log', 'ChampionService', 'ChampionInteractivityService', 'ItemService', 'ItemInteractivityService', 'SoundEffectService', 'ItemSetService',
        function ($scope, $http, $log, ChampionService, ChampionInteractivityService, ItemService, ItemInteractivityService, SoundEffectService, ItemSetService) {
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
        
        controller.buildClickHandled = false;

        $scope.$on('ngBuildRepeatFinished', function (ngRepeatFinishedEvent) {
            ItemInteractivityService.addTooltipAndClickModal($(".build-overview .item-image"));
            $(".build-overview .champ-image").click(function (event) {
                if (controller.buildClickHandled) return;
                var matchId = $(this).attr("data-match-id");
                event.stopPropagation();
                // get the timeline
                var match;
                var timeline;
                $.each(controller.matchStats, function (i, m) {
                    if (m.matchId == matchId) {
                        match = m;
                        timeline = controller.matchTimelines[i];
                        return false;
                    }
                });
                if (timeline == null || match == null || timeline == undefined || match == undefined) return;
                // parse build timeline into a build
                var itemBlocks = [];
                var items = [];
                var preTimestamp = -1;
                $.each(timeline, function (i, event) {
                    items.push(ItemSetService.createItem(event.itemId, 1));
                    if (event.timestamp - preTimestamp > 2.5 * 60 * 1000) {
                        var blockTitle = "Purchase " + (itemBlocks.length + 1).toString();
                        itemBlocks.push(ItemSetService.createItemBlock(blockTitle, false, -1, -1, "", "", items));
                        items = [];
                        preTimestamp = event.timestamp;
                    }
                });
                var setTitle = match.summonerName + " " + match.champion.name;
                var set = ItemSetService.createItemSet(setTitle, "custom", "any", "any", false, 0, itemBlocks);
                ItemSetService.renderItemSet(set);
                controller.buildClickHandled = true;
                setTimeout(function () { controller.buildClickHandled = false; }, 1000);

            });
        });

        controller.getChampions = function () {
            return ChampionService.getChampions();
        };
        
        controller.matchTimelines = [];
        controller.matchStats = [];

        controller.getBuilds = function (id) {
            var request = $.ajax({
                url: "src/index.php",
                method: "POST",
                data: { "action": "getChampBuilds", "id": id },
                dataType: "json",
                success: function (data) {
                    if (data == null || data == undefined) return;

                    controller.matchTimelines = [];
                    controller.matchStats = [];

                    $.each(data, function (i, match) {
                        // Parse timeline data for match
                        matchItemTimeline = [];
                        var participant = null;
                        $.each(match.participants, function (i, p) {
                            if (p.championId == id){
                                participant = p;
                                return false;
                            }
                        });
                        $.each(match.timeline.frames, function (i, frame) {
                            if (frame.events == null || frame.events == undefined) return true;
                            $.each(frame.events, function (i, event) {
                                if (event.participantId != participant.participantId) return true;
                                if (event.eventType !== "ITEM_PURCHASED") return true;
                                event.timestamp = event.timestamp + i*60*1000;
                                matchItemTimeline.push(event);
                            });
                        });
                        controller.matchTimelines.push(matchItemTimeline);

                        // Create user display
                        participant.stats["summonerName"] = match.participantIdentities[participant.participantId].player.summonerName;
                        participant.stats["champion"] = ChampionService.getChampion(id);
                        participant.stats["matchDuration"] = Math.floor(match.matchDuration / 60).toString() + ":" + (match.matchDuration % 60).toString();
                        participant.stats["matchId"] = match.matchId;

                        participant.stats["matchItems"] = [];
                        for (var i = 0; i < 7; i++) {
                            participant.stats["matchItems"].push(ItemService.getItem(participant.stats["item" + i.toString()]));
                        }

                        controller.matchStats.push(participant.stats);
                        $scope.$apply();
                    });
                },
                error: function () {

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

    /**
    * The champion directive for handling actions taken after each champion is added to the store.
    */
    app.directive('buildChampionDraggable', function ($timeout) {
        function link(scope, element, attrs) {
            var el = angular.element(element);

            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngBuildRepeatFinished');
                });
            }
        }
        return {
            restrict: 'A',
            link: link
        };
    });

})();