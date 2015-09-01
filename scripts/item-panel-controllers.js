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
    * Controls the panels.
    */
    app.controller('PanelController', ['SoundEffectService', function (SoundEffectService) {
        this.tab = 1;
        
        this.selectTab = function (setTab, playSound) {
            if(playSound == true)
                SoundEffectService.playSoundBite("click");
            return this.tab = setTab;
        };
        this.isSelected = function(checkTab){
            return this.tab === checkTab;
        };
    }]);
    
    /**
    * The item controller for managing item sets.
    */
    app.controller('ItemSetController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', 'ItemInteractivityService', 'SoundEffectService', 'NotificationService', 'ItemSetService',
            function ($scope, $http, $log, ChartService, ItemService, ItemInteractivityService, SoundEffectService, NotificationService, ItemSetService) {
        var controller = this;

        /**
        * Initializes the controller.
        */
        controller.init = function () {
            // Add the initial item drop section
            var setId = getUrlParameter("set");
            if(setId === true)
                controller.addSection();
            else {
                var request = $.ajax({
                    url: "src/index.php",
                    method: "POST",
                    data: { "action": "getBuild", "setId": setId },
                    dataType: "json",
                    success: function (data) {
                        ItemSetService.renderItemSet(data);
                    },
                    error: function(){

                    }
                });
             }


            $("#importButton").change(controller.importSet);
        };

        function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
            return true;
        };

        /**
        * Adds a new item section to the item workarea.
        */
        controller.addSection = function (playSound) {
            if(playSound == true)
                SoundEffectService.playSoundBite("click");

            var workArea = $("#item-set-div");

            var section = ItemSetService.createSection();
            
            workArea.append(section);
            
            var workParent = workArea.parent();
            workParent.scrollTop(workParent[0].scrollHeight);
        };
        
        controller.parseItemSet = function(){
            var blocks = [];

            var setTitle = $("input.set-title").val();

            $(".item-drop-section").each(function(indexSect){
                var itemCollection = $(".item-image", $(this));
                var count = itemCollection.length;

                var itemsObj = {};
                var itemOrder = 0;
                itemCollection.each(function(index){
                    var id = $(this).attr("data-item-id");
                    if (itemsObj[id] == null || itemsObj[id] == undefined) {
                        itemsObj[id] = { "index": itemOrder, "item": ItemSetService.createItem(id, 0) };
                        itemOrder = itemOrder + 1;
                    }
                    itemsObj[id].item.count = itemsObj[id].item.count + 1;
                });
                var items = [];
                $.each(itemsObj, function (index, value) {
                    items[value.index] = value.item;
                });
                var title = $("input.section-title", $(this).parent()).val();
                blocks[indexSect] = ItemSetService.createItemBlock(title, false, -1, -1, "", "", items);
            });

            return ItemSetService.createItemSet(setTitle, "custom", "any", "any", false, 0, blocks);
        };
        
        controller.exportSet = function () {
            var set = controller.parseItemSet();
            if (set == undefined) {
                NotificationService.displayMsg(4, "Error: Failed to export build set. Make sure that each section has a title and at least one item.", true);
                return;
            }
            var setStr = JSON.stringify(set);
            var setTitle = $("input.set-title").val();

            $("#action").val("export");
            $("#pageName").val(setTitle);
            $("#data").val(setStr);
            $("#importExportForm").attr("action", "src/index.php");
            $("#importExportForm").submit();
        };

        controller.importSet = function (e) {
            try {
                var file = e.target.files[0];
                if (!file || file.name.length <= 4 || file.name.substring(file.name.length - 4) != "json") {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    var contents = e.target.result;
                    var set = JSON.parse(contents);
                    ItemSetService.renderItemSet(set);
                };
                reader.readAsText(file);
            }
            catch (ex) {
                NotificationService.displayMsg(4, "Error: Failed to decode item set. Contents may be illformed.", true);
            }
        };

        controller.shareSet = function () {
            var set = controller.parseItemSet();
            if (set == undefined) {
                NotificationService.displayMsg(4, "Error: Failed to export build set. Make sure that each section has a title and at least one item.", true);
                return;
            }
            var setStr = JSON.stringify(set);

            var request = $.ajax({
                url: "src/index.php",
                method: "POST",
                data: { "action": "shareBuild", "data": setStr },
                dataType: "json",
                success: function (data) {
                    NotificationService.displayMsg(0, "Use this url to share your build: itembuilds.bstadick.com/?set=" + data, false);
                },
                error: function () {

                }
            });
        };

        // Initialize the controller
        controller.init();

    } ]);

    /**
    * The item controller for managing the gold game.
    */
    app.controller('GoldGameController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', 'ItemInteractivityService',
        function ($scope, $http, $log, ChartService, ItemService, ItemInteractivityService) {
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
                    //console.log("Item too small:" + item.name + item.depth);
                }
                // get the sub-item and calculate gold difference
                var childId = item.from[Math.floor(Math.random()*item.from.length)];
                var childItem = ItemService.getItem(childId);
                var itemCost = item.gold.total;
                var childCost = childItem.gold.total;
                //console.log("Parent Cost: " + itemCost + "\nChild Cost: " + childCost + "\nDifference: " + (itemCost - childCost));
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
