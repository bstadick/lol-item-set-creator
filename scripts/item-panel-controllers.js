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
    app.controller('ItemSetController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', 'ItemInteractivityService', 'SoundEffectService', 'NotificationService',
            function ($scope, $http, $log, ChartService, ItemService, ItemInteractivityService, SoundEffectService, NotificationService) {
        var controller = this;
        
        var exampleSet = {
            "title": "The name of the page",
            "type": "custom",
            "map": "any",
            "mode": "any",
            "priority": false,
            "sortrank": 0,
            "blocks": [
                {
                    "type": "A block with just boots",
                    "recMath": false,
                    "minSummonerLevel": -1,
                    "maxSummonerLevel": -1,
                    "showIfSummonerSpell": "",
                    "hideIfSummonerSpell": "",
                    "items": [
                        {
                            "id": "1001",
                            "count": 1
                        },
                    ]
                },
            ]
        };

        /**
        * Initializes the controller.
        */
        controller.init = function () {
            // Add the initial item drop section
            controller.addSection();

            $("#importButton").change(controller.importSet);
        };

        controller.createItemSet = function (title, type, map, mode, priority, sortrank, blocks) {
            try {
                if (type !== "custom" && type !== "global") type = "custom";
                if (title == null || title == undefined) title = "";
                if (map !== "any" || map !== "SR" || map !== "HA" || map !== "TT" || map !== "CS") map = "any";
                if (mode !== "any" || mode !== "CLASSIC" || mode !== "ARAM" || mode !== "ODIN") mode = "any";
                if (priority != true) priority = false;
                if (typeof sortrank !== 'number' || sortrank < 0) sortrank = 0;
                if (blocks == null || blocks == undefined || blocks.length <= 0) return undefined;

                // Check if each block and items are valid, else return
                var blockKeys = ["type", "recMath", "minSummonerLevel", "maxSummonerLevel", "showIfSummonerSpell", "hideIfSummonerSpell", "items"];
                var itemKeys = ["id", "count"];

                $.each(blocks, function (index, block) {
                    var validBlockCount = 0;
                    $.each(Object.keys(block), function (index, key) {
                        var present = $.grep(blockKeys, function (value) { value === key });
                        if (present != null && present != undefined && present.length == 1)
                            validBlockCount = validBlockCount + 1;
                    });

                    if (blocks.items == null || blocks.items == undefined || blocks.items.length <= 0) return undefined;

                    $.each(block.items, function (index, item) {
                        var validItemCount = 0;
                        $.each(Object.keys(item), function (index, key) {
                            var present = $.grep(itemKeys, function (value) { return value === key; });
                            if (present != null && present != undefined && present.length == 1)
                                validItemCount = validItemCount + 1;
                        });

                        if (validItemCount !== itemKeys.length) return undefined;
                    });
                    
                    if (validBlockCount !== blockKeys.length) return undefined;
                });

                return {
                    "title": title,
                    "type": type,
                    "map": map,
                    "mode": mode,
                    "priority": priority,
                    "sortrank": sortrank,
                    "blocks": blocks
                };
            }
            catch (ex) {
                return undefined;
            }
        };

        controller.createItemBlock = function (type, recMath, minSummonerLevel, maxSummonerLevel, showIfSummonerSpell, hideIfSummonerSpell, items) {
            try{
                if (type == null || type == undefined || type.trim() == "") return undefined;
                if (recMath != true) recMath = false;
                if (typeof minSummonerLevel !== 'number' || minSummonerLevel < -1) minSummonerLevel = -1;
                if (minSummonerLevel > 30) minSummonerLevel = 30;
                if (typeof maxSummonerLevel !== 'number' || maxSummonerLevel < -1) maxSummonerLevel = -1;
                if (maxSummonerLevel > 30) maxSummonerLevel = 30;
                if (showIfSummonerSpell == null || showIfSummonerSpell == undefined) showIfSummonerSpell = "";
                if (hideIfSummonerSpell == null || hideIfSummonerSpell == undefined) hideIfSummonerSpell = "";
                if (items == null || items == undefined || items.length <= 0) items = [];
                return {
                    "type": type,
                    "recMath": recMath,
                    "minSummonerLevel": minSummonerLevel,
                    "maxSummonerLevel": maxSummonerLevel,
                    "showIfSummonerSpell": showIfSummonerSpell,
                    "hideIfSummonerSpell": hideIfSummonerSpell,
                    "items": items
                };
            }
            catch (ex) {
                return undefined;
            }
        };

        controller.createItem = function (id, count) {
            try{
                if (!ItemService.isItem(id)) return undefined;
                if (typeof count !== 'number' || count < 0) count = 1;
                return { "id": id, "count": count };
            }
            catch (ex) {
                return undefined;
            }
        };
        
        /**
        * Adds a new item section to the item workarea.
        */
        controller.addSection = function (playSound) {
            if(playSound == true)
                SoundEffectService.playSoundBite("click");

            var workArea = $("#item-set-div");

            var section = controller.createSection();
            
            workArea.append(section);
            
            var workParent = workArea.parent();
            workParent.scrollTop(workParent[0].scrollHeight);
        };

        controller.renderItemSet = function (itemSet) {
            try {
                var workArea = $("#item-set-div");
                workArea.empty();

                $("input.set-title").val(itemSet.title);
            
                $.each(itemSet.blocks, function (index, block) {
                    var section = controller.createSection();
                    var dropSection = $(".item-drop-section", section);
                    var title = $("input.section-title", section);
                    title.val(block.type);

                    $.each(block.items, function (index, item) {
                        var img = ItemService.getItemImageById(item.id, "item-copy");
                        dropSection.append(img);
                    });

                    workArea.append(section);
                });
                NotificationService.displayMsg(1, "Success: Item set successfully imported.", true);
                return true;
            }
            catch (ex) {
                NotificationService.displayMsg(4, "Error: Failed to decode item set. Contents may be illformed.", true);
            }
            return false;
        };

        controller.createSection = function () {
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
            removeButton.click(function () {
                $(this).parent().parent().parent().remove();
            });
            removeButton.uitooltip();
            $(".section-remove", sectionTitleForm).append(removeButton);

            section.append(sectionTitleForm);

            // Add sortable section
            dropSection = dropSection.sortable({
                connectWith: ".item-drop-section",
                containment: "#item-set-div",
                update: function (event, ui) {
                    if (!ui.item.hasClass("item-copy"))
                        ui.item.addClass("item-copy");
                    ItemInteractivityService.addItemContextMenu($("#workarea"), ".item-copy");
                }
            });

            section.append(dropSection);

            return section;
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
                        itemsObj[id] = { "index": itemOrder, "item": controller.createItem(id, 0) };
                        itemOrder = itemOrder + 1;
                    }
                    itemsObj[id].item.count = itemsObj[id].item.count + 1;
                });
                var items = [];
                $.each(itemsObj, function (index, value) {
                    items[value.index] = value.item;
                });
                var title = $("input.section-title", $(this).parent()).val();
                blocks[indexSect] = controller.createItemBlock(title, false, -1, -1, "", "", items);
            });

            return controller.createItemSet(setTitle, "custom", "any", "any", false, 0, blocks);
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
                if (!file) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    var contents = e.target.result;
                    var set = JSON.parse(contents);
                    controller.renderItemSet(set);
                };
                reader.readAsText(file);
            }
            catch (ex) {
                NotificationService.displayMsg(4, "Error: Failed to decode item set. Contents may be illformed.", true);
            }
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
