/**
* Drag-drop item code
* @author
* @version 0.0.5
* @copyright � 2015
*/
(function() {

    // The AngularJS module.
    var app = angular.module('builds');

    /**
    * Controls the panels.
    */
    app.controller('PanelController', function(){
        this.tab = 1;

        this.selectTab = function(setTab){
            return this.tab = setTab;
        };
        this.isSelected = function(checkTab){
            return this.tab === checkTab;
        };
    });

    /**
    * The item controller for managing item sets.
    */
    app.controller('ItemSetController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', 'ItemInteractivityService', function($scope, $http, $log, ChartService, ItemService, ItemInteractivityService){
        var controller = this;

        /**
        * Initializes the controller.
        */
        controller.init = function(){
            // Add the initial item drop section
            controller.addSection();
        };

        /**
        * Adds a new item section to the item workarea.
        */
        controller.addSection = function(){
            var workArea = $("#item-set-div");
            var section = $("<div class='item-section'></div>");
            var dropSection = $("<div class='item-drop-section'></div>");

            // Add section header
            var sectionTitleForm = $("<div class='row section-header'>" +
                "<div class='col-sm-10'><form class='section-header-form' action='#'>" +
                    "<input class='section-title form-control' type='text' placeholder='Section Title'>" +
                "</form></div>" +
                "<div class='section-remove col-sm-2'></div>" +
                "</div>");

            // Add remove section button
            var removeButton = $("<button class='section-remove-button btn btn-xs btn-default' title='Remove Section'>-</button>");
            removeButton.click(function(){
                $(this).parent().parent().parent().remove();
            });
            removeButton.uitooltip();
            $(".section-remove", sectionTitleForm).append(removeButton);

            section.append(sectionTitleForm);

            // Add sortable section
            dropSection = dropSection.sortable({
                connectWith: ".item-drop-section",
                containment: "#item-set-div",
                update: function(event, ui){
                    //ItemInteractivityService.addHoverToolTip(ui.item);
                    if(!ui.item.hasClass("item-copy"))
                        ui.item.addClass("item-copy");
                    ItemInteractivityService.addItemContextMenu($("#workarea"), ".item-copy");
                }
            });
            section.append(dropSection);

            workArea.append(section);

            var workParent = workArea.parent();
            workParent.scrollTop(workParent[0].scrollHeight);
        };


        controller.parseItemSet = function(){
            var sets = [];
            $(".item-drop-section").each(function(indexSect){
                var itemCollection = $(".item-image", this);
                var count = itemCollection.length;
                var ids = [];
                itemCollection.each(function(index){
                    ids[index] = $(this).attr("data-item-id");
                });
                sets[indexSect] = ids;

                var sectionForm = $("form", $(this).parent());
                var sectionTitle = $(".section-title", sectionForm).val();
                // TODO - do something with the set data
            });
        };

        // Initialize the controller
        controller.init();

    } ]);

    /**
    * The item controller for managing item build trees.
    */
    app.controller('ItemBuildTreeController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', 'ItemInteractivityService', function($scope, $http, $log, ChartService, ItemService, ItemInteractivityService){
        var controller = this;

        /**
        * Initializes the controller.
        */
        controller.init = function(){

        };

        controller.parseItemBuild = function(){
            var itemCollection = $("#item-build-div .item-image");
            var count = itemCollection.length;
            var ids = [];
            itemCollection.each(function(index){
                ids[index] = $(this).attr("data-item-id");
            });
            // TODO - do something with the build tree data
        };

        // Initialize the controller
        controller.init();

    } ]);

    /**
    * The item controller for managing the gold game.
    */
    app.controller('GoldGameController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', 'ItemInteractivityService', function($scope, $http, $log, ChartService, ItemService, ItemInteractivityService){
        var controller = this;

        /**
        * Initializes the controller.
        */
        controller.init = function(){
            // Add the initial gold mini-game section
            controller.addRandomItem();
        };

        /**
        * Adds a new random item for gold mini-game
        */
        controller.addRandomItem = function(){
            // Used to randomize the array of item ids
            function shuffle(o){ //v1.0
                for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            };

            function getRandomInt(min, max) {
                return 5 * Math.round(Math.floor(Math.random() * (max - min + 1))/5) + min;
            }
            var workArea = $("#item-goldgame-div");
            var goldButtons = $("#gold-button-div");
            var score = $("#score-div");
            var scoreCounter = "<button class=\"btn btn-primary\" type=\"button\">Score <span class=\"badge\" id=\"score-counter\">0</span></button>"
            // create random array of all item ids
            var keyArray = $.map(ItemService.getItems(), function(value,key) {return key});
            shuffle(keyArray);
            var randomItemId = keyArray[Math.floor(Math.random()*keyArray.length)];
            //var randomSprite = ItemService.getItemImageById(randomItemId, "draggable-item");
            var itemArea = generateRandomitem();

            // TODO remove muramana or other transforming items
            function generateRandomitem(){
                var  randomItemId = keyArray[Math.floor(Math.random()*keyArray.length)];
                var  item  = ItemService.getItem(randomItemId);
                while (item.depth < 1 || item.depth === undefined){
                    randomItemId = keyArray[Math.floor(Math.random()*keyArray.length)];
                    item  = ItemService.getItem(randomItemId);
                    console.log("Item too small:" + item.name + item.depth);
                }
                // get the sub-item and calculate gold difference
                var childId = item.from[Math.floor(Math.random()*item.from.length)];
                var childItem = ItemService.getItem(childId);
                var itemCost = item.gold.total;
                var childCost = childItem.gold.total;
                console.log("Parent Cost: " + itemCost + "\nChild Cost: " + childCost + "\nDifference: " + (itemCost - childCost));
                var randomSprite = ItemService.getItemImageById(randomItemId, "draggable-item");
                var childSprite = ItemService.getItemImageById(childId, "draggable-item");
                itemArea = $("<div class='item-section' id='random-sprite'>" + childSprite[0].outerHTML + randomSprite[0].outerHTML+"</div>");

                var goldArray = [];
                var targetGold = itemCost - childCost;
                goldArray.push(targetGold);
                goldButtons.empty();
                // generate some random gold amounts
                var i =0;
                while (i<2){
                  var goldValue = getRandomInt(childCost,(itemCost - childCost));
                  // random value was the actual purchase amount
                  if (goldValue != targetGold && goldArray.indexOf(goldValue) == -1){
                    goldArray.push(goldValue);
                    i++;
                  }
                }
                // shuffle order of choices
                shuffle(goldArray);
                // create buttons for gold amounts
                for (var i=0; i<goldArray.length; i++){
                    if (goldArray[i] == targetGold){
                      goldButtons.append("<button type=\"button\" class=\"btn-gold\" id=\"target-gold\">"+ goldArray[i] +"</button>");
                    }
                    else{
                      goldButtons.append("<button type=\"button\" class=\"btn-gold\">"+ goldArray[i] +"</button>");
                    }
                }
                var randomSprite = ItemService.getItemImageById(randomItemId, "draggable-item item-image ng-scope ui-draggable ui-draggable-handle");
                var childSprite = ItemService.getItemImageById(childId, "draggable-item item-image ng-scope ui-draggable ui-draggable-handle");
                itemArea = $("<div class='item-section' id='random-sprite'>" +childSprite[0].outerHTML + randomSprite[0].outerHTML+"</div>");

                $(".btn-gold").click(function(){
                    // check if the correct amount was selected
                    if ($(this)[0].id == "target-gold"){
                      var updateScore = Number($("#score-counter")[0].innerHTML) + 100;
                    }
                    else{
                      var updateScore = Number($("#score-counter")[0].innerHTML) - 50;
                    }
                    // create new items
                    $("#score-counter")[0].innerHTML = updateScore;
                    $('#random-sprite').replaceWith(generateRandomitem()[0]);
                });
                return itemArea;
            };


            var buttonArea = $('#button-random');
            var randomButton = $("<button class=\"btn btn-xs btn-default fa fa-random fa-2x\" title=\"Random Item\"></button>");
            //var randomButton = $("<button class='section-remove-button btn btn-xs btn-default' title='Random Item'>?</button>");
            randomButton.click(function(){
                $('#random-sprite').replaceWith(generateRandomitem()[0]);
            });
            //randomButton.uitooltip();
            score.append(scoreCounter);
            workArea.append(randomButton);
            workArea.append(itemArea);
        };


        // Initialize the controller
        controller.init();

    } ]);

})();
