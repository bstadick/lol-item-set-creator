/**
* Drag-drop item code
* @author 
* @version 0.0.5
* @copyright 2015
*/
(function() {

    // The AngularJS module.
    var app = angular.module('builds', []);
    
    app.controller('ModuleInit', ['$scope', 'ChartService', 'ItemService', 'ItemInteractivityService', 'SoundEffectService', function ($scope, ChartService, ItemService, ItemInteractivityService, SoundEffectService) {
        var controller = this;

        controller.init = function () {
            // Rename jquery ui widgets to avoid name collisions with bootstrap
            $.widget.bridge('uibutton', $.ui.button);
            $.widget.bridge('uitooltip', $.ui.tooltip);

            // Load google tree view and draw initial view
            if (ChartService.loadGoogleVisualization())
                google.setOnLoadCallback(function () { });

            // Organize items by category
            ItemService.populateItemLists();

            SoundEffectService.addSoundBite("click", ["audio/click.ogg", "audio/click.mp3"], 0.25);
            SoundEffectService.addSoundBite("whistle", ["audio/whistle.ogg", "audio/whistle.mp3"], 0.25);
        };
        
        // Initialize the module
        controller.init();
    }]);

    /**
    * Service for displaying notifications to the user.
    */
    app.factory('NotificationService', [function(){

        return {
            displayMsg: function (level, message, autoDismiss) {
                if (autoDismiss != true)
                    autoDismiss = false;
                var errorClass = "bg-primary";
                if (level == 0)
                    errorClass = "bg-primary";
                if (level == 1)
                    errorClass = "bg-success";
                if (level == 2)
                    errorClass = "bg-info";
                if (level == 3)
                    errorClass = "bg-warning";
                if (level == 4)
                    errorClass = "bg-danger";

                var errorDiv = $("<div>");
                var errorP = $("<p class='" + errorClass + "'>" + message + "</p>")
                var timeout;
                var button = $("<button class='btn btn-default error-dismiss'>Dismiss</button>").click(function () {
                    $("#errorDiv").slideUp("slow", function () {
                        $("#errorDiv").empty();
                        if (timeout != null && timeout != undefined)
                            clearTimeout(timeout);
                    });
                });
                errorP.append(button);
                errorDiv.append(errorP);
                $("#errorDiv").append(errorDiv).slideDown("slow");
                if(autoDismiss)
                    timeout = setTimeout(function () {
                        $("#errorDiv").slideUp("slow", function () {
                            $("#errorDiv").empty();
                        });
                    }, 5000);
            }
        };

    }]);

    /**
    * The Google Charts API loader service.
    */
    app.factory('ChartService',[ function() {
        var loaded = false;
        return {
            
            /**
             * Loads the visualization module from the Google Charts API if available.
             * @returns {boolean} Returns true is successful, or false if not available.
             */
            loadGoogleVisualization: function() {
                
                // Using a try/catch block to guard against unanticipated 
                // errors when loading the visualization lib
                try {

                    // Arbitrary callback required in google.load() to 
                    // support loading after initial page rendering
                    google.load('visualization', '1', {
                        'callback':'console.log(\'google chart load success\');', 
                        'packages':['corechart', 'orgchart']
                    });
                    
                    loaded = true;
                    return true;
                
                } catch(e) {
                    console.log('Could not load Google lib', e);
                    return false;  
                }

            },
            
            /**
            * Get if the Google Charts API is loaded.
            * @returns {boolean} If the service is loaded.
            */
            isLoaded: function(){ return loaded; }
        };
    }]);
    
    /**
    * The item data set management service. 
    */
    app.factory('ItemService', [ function() {
        /**
        * The items list object.
        */
        var items = itemsGlobal;
        
        /**
        * The item shop categories list object.
        */
        var itemCategories = itemCategoriesGlobal;
        
        /**
        * The item search key/value pairs.
        */
        var itemSearchKeys = [];
        
        /**
        * The service object and available members.
        */
        var service = {
        
            /**
            * Gets the list of items.
            * @returns {Object} The list of items.
            */
            getItems: function(){
                return items.data;
            },
            
            /**
            * Gets the item specified by the id.
            * @param {string} id - The id of the item to get.
            * @returns {Object} The item with the specified id or undefined if not present.
            */
            getItem: function(id){
                if(id == null || id == undefined || id.toString().trim() == "") return undefined;
                return items.data[id.toString()];
            },
            
            /**
            * Gets if the item id is an item in the list.
            * @param {string} id - The id of the item to check for.
            * @returns {boolean} If the item with the id is in the list.
            */
            isItem: function(id){
                if(id == null || id == undefined || id.toString().trim() == "") return false;
                
                var item = this.getItem(id);
                if(item == null || item == undefined) return false;
                return true;
            },
            
            /**
            * Adds an item to the list if it is not already present.
            * @param {Object} item - The item to add to the list.
            */
            addItem: function(item){
                if(item == null || item == undefined) return;
                if(item.id == null || item.id == undefined || item.id.toString().trim() == "") return;
                if(this.isItem(item.id)) return;
                
                items.data[item.id.toString()] = item;
            },
            
            /**
            * Sets the item in the list if present, else adds it.
            * @param {Object} item - The item to set or add to the list.
            */
            setItem: function(item){
                if(item == null || item == undefined) return;
                if(item.id == null || item.id == undefined || item.id.toString().trim() == "") return;
                
                items.data[item.id.toString()] = item;
            },
            
            /**
            * Gets the list of item categories.
            * @returns {Array} The list of item category objects.
            */
            getCategories: function(){
                return itemCategories;
            },
            
            /**
            * Gets the category object specified.
            * @param {string} category - The id of the category object to get.
            * @returns {Object} The category object specified, or undefined if not present.
            */
            getCategory: function(category){
                var cat = $.grep(itemCategories, function(e){return e.id.toLowerCase()  == category.toLowerCase();});
                if(cat == null || cat == undefined || cat.length <= 0) return undefined;
                return cat[0];
            },
            
            /**
            * Adds an item to a category.
            * @param {string} category - The id of the category to add the item to.
            * @param {Object} item - The item object to add.
            */
            addItemToCategory: function(category, item){
                if(category == null || category == undefined || category.trim() == "") return;
                if(item == null || item == undefined) return;
                
                var cat = this.getCategory(category);
                if(cat == null || cat == undefined) return;
                cat.items.push(item);
            },
            
            /**
            * Adds an item to a category's parent category.
            * @param {string} category - The id of the category to add the item to its parent category.
            * @param {Object} item - The item object to add.
            */
            addItemToCategoryParent: function(category, item){
                if(item == null || item == undefined) return;
                if(item.id == null || item.id == undefined || item.id.toString().trim() == "") return;
                if(category == null || category == undefined || category.trim() == "") return;
                
                // Get category
                var cat = this.getCategory(category);
                if(cat == null || cat == undefined) return;
                if(cat.parentId == null || cat.parentId == undefined || cat.parentId.trim() == "") return;
                
                // Get parent category
                var parent = $.grep(itemCategories, function(e){return e.id.toLowerCase()  == cat.parentId.toLowerCase();});
                if(parent == null || parent == undefined || parent.length <= 0) return;
                parent = parent[0]
                
                // Check if item is already in the parent category item list
                var parentItem = $.grep(parent.items, function(e){return e.id == item.id;});
                if(parentItem == null || parentItem == undefined || parentItem.length <= 0){
                    parent.items.push(item);
                }
            },
            
            /**
            * Gets the item image as an item element.
            * @param {Object} item - The item to get the image of.
            * @param {string} cssClasses - Additional css classes to add to the image element.
            * @returns {Jquery} The image of the item as an image element.
            */
            getItemImage: function(item, cssClasses){
                if(item == null || item == undefined || item.image == null || item.image == undefined) return undefined;
                return $("<img class='item-image " + cssClasses + "' src='img/item-trans.png'" +
                    "style='width:" + item.image.w + "px; height:" + item.image.h + "px; background: url(img/" + item.image.sprite + ") no-repeat;" + 
                    " background-position: -" + item.image.x + "px -" + item.image.y + "px;'" + " data-item-id='" + item.id + "'></div>");
            },
            
            /**
            * Gets the item image as an item element.
            * @param {string} id - The id of the item to get the image of.
            * @param {string} cssClasses - Additional css classes to add to the image element.
            * @returns {Jquery} The image of the item as an image element.
            */
            getItemImageById: function(id, cssClasses){
                if(id == null || id == undefined || id.toString().trim() == "") return undefined;
                
                var item = this.getItem(id);
                if(item == null || item == undefined) return undefined;
                return this.getItemImage(item, cssClasses);
            },
            
            /**
            * Gets the search auto-complete item key list.
            * @returns {Array} The search auto-complete item key list.
            */
            getItemSearchKeys: function(){
                return itemSearchKeys
            },
            
            /**
            * Adds an item search auto-complete key to the list.
            * @param {string} itemLabel - The label searched on by the auto-complete (key).
            * @param {string} itemValue - The value to pass to the call
            */
            addItemSearchKey: function(itemLabel, itemValue){
                itemSearchKeys.push({
                   label: itemLabel,
                   value: itemValue
                });
            },
            
            /**
            * Iterates through the item list and populates the sub-categories list and search auto-complete keys.
            */
            populateItemLists: function(){
                var itemService = this;
                $.each(itemService.getItems(), function(itemKey, itemValue){
                    // Add to the all items category
                    itemService.addItemToCategory("all", itemValue);
                    
                    // Map and add to the item's listed subcategories
                    if(itemValue.tags != null && itemValue.tags != undefined){
                        $.each(itemValue.tags, function(index, category){
                            itemService.addItemToCategory(category, itemValue);
                            itemService.addItemToCategoryParent(category, itemValue);
                        });
                    }
                    
                    // Add to the search bar source
                    itemService.addItemSearchKey(itemValue.name, itemKey);
                    
                    // Add colloquialisms to the search bar source
                    if(itemValue.colloq != null && itemValue.colloq != undefined && itemValue.colloq.trim() != ""){
                        var colloqs = itemValue.colloq.split(";");
                        $.each(colloqs, function(index, colloqValue){
                            itemService.addItemSearchKey(colloqValue, itemKey);
                        });
                    }
                });
            }
        };
            
        return service;
    }]);
    
    /**
    * The item interactivity service for item elements placed in the DOM.
    */
    app.factory('ItemInteractivityService', ['ItemService', 'ChartService', 'SoundEffectService', function (ItemService, ChartService, SoundEffectService) {
        
        /**
        * Creates a Google orgchart tree array for the build of the given item id.
        * @param {string} id - The id of the item to create the build path for.
        * @param {boolean} isPlaceholder - If the tree is made of placeholder divs.
        * @return {Array} The Google orgchart tree array.
        */
        function getItemBuildTree(id, isPlaceholder){
            var item = ItemService.getItem(id);
            if(item == null || item == undefined) return undefined;
            
            var tree = createItemBuildTreeRecurse(item, null, 0, isPlaceholder);
            return tree.items;
        }
        
        /**
        * Creates a tree hierarchy from the provided item.
        * @param {Object} item - The root item to create the tree for.
        * @param {Object} tree - The tree object that is being created. Initial call should be null.
        * @param {int} parentId - The id of the parent node in the tree.
        * @param {boolean} isPlaceholder - If the tree is made of placeholder divs.
        * @returns {Object} The tree object that is being created
        */
        function createItemBuildTreeRecurse(item, tree, parentId, isPlaceholder){
            // Root entry
            if(tree == null){
                tree = { id: 1, items: [] };
                parentId = tree.id;
                var entry;
                if(isPlaceholder)
                    entry = [{v:tree.id.toString(), f:"<div class='item-placeholder' data-item-id='" + item.id + "'></div>"}, '', ''];
                else{
                    var itemImg = ItemService.getItemImage(item, "");
                    if(itemImg != null && itemImg != undefined)
                        entry = [{v:tree.id.toString(), f:itemImg[0].outerHTML}, '', ''];
                }
                tree.items.push(entry);
            }
            
            // Sub-entries
            if(item.from != null && item.from != undefined){
                $.each(item.from, function(index, value){
                    tree.id = tree.id + 1;
                    var childItem = ItemService.getItem(value);
                    var entry;
                    if(isPlaceholder)
                        entry = [{v:tree.id.toString(), f:"<div class='item-placeholder' data-item-id='" + childItem.id +  "'></div>"}, parentId.toString(), ''];
                    else{
                        var itemImg = ItemService.getItemImage(childItem, "item-modal-image");
                        if(itemImg != null && itemImg != undefined)
                            entry = [{v:tree.id.toString(), f:itemImg[0].outerHTML}, parentId.toString(), ''];
                    }
                    tree.items.push(entry);
                    tree = createItemBuildTreeRecurse(childItem, tree, tree.id, isPlaceholder);
                });
            }
            return tree;
        }
        
        /**
        * The callback used to create the content for the click modals.
        * @param {JQuery} element - The Jquery object the modal content is to be added to.
        * @param {Jquery} chartDiv - The 
        * @returns {string} The content to add to the modal.
        * @see modalContentCallback
        * @see addClickModal
        */
        function itemModalContent(element, chartDiv){
            var id = element.attr("data-item-id");
            var item  = ItemService.getItem(id);
            var modalDiv =  $("<div title='" + item.name.replace("'", "&#39;") + " Cost: " + item.gold.total + " (" + item.gold.base + ")'></div>");
            
            var buildsIntoDiv = $("<div class='item-modal-builds-into'></div>");
            if(item.into != null && item.into != undefined){
                $.each(item.into, function(index, itemId){
                    buildsIntoDiv.append(ItemService.getItemImageById(itemId, "item-modal-builds-into-image"));
                });
            }
            modalDiv.append(buildsIntoDiv);
            
            // Build path
            var buildPath = $("<div class='item-modal-build-path'></div>");
            service.drawBuildPath(id, false, buildPath);
            modalDiv.append(buildPath);
            
            // Item description
            modalDiv.append(item.description);
            
            return modalDiv;
        }
        
        /**
        * The callback used to create the content for the item tooltips.
        * @param {JQuery} element - The Jquery object the tooltip content is to be added to.
        * @returns {string} The content to add to the tooltip.
        * @see tooltipContentCallback
        * @see addHoverToolTip
        */
        function itemTooltipContent(element){
            var id = element.attr("data-item-id");
            var item  = ItemService.getItem(id);
            if(item == null || item == undefined) return "";
            return item.name;
        };
        
        /**
        * The service object and available members.
        */
        var service = {
        
            /**
            * Adds hover tooltip and click modal to the elements specified by the selector.
            * @param {Jquery} selector - The Jquery selector object of the elements to add the tooltip and modal to.
            */
            addTooltipAndClickModal: function(selector){
                var thisService = this;
                selector.each(function(index){
                    thisService.addHoverToolTip($(this));
                });
                thisService.addClickModal(selector);
            },
            
            /**
            * Adds a tooltip on hover to the element.
            * @param {JQuery} element - The Jquery object to add the tooltip to.
            * @returns {JQuery} The Jquery object added to.
            */
            addHoverToolTip: function(element){
                element.uitooltip({
                    items: '*',
                    content: itemTooltipContent(element),
                    open: function(event, ui){
                        setTimeout(function(){ $(ui.tooltip).hide("fade"); }, 3000);
                    }
                });
                return element;
            },
            
            /**
            * Adds a click modal to the element.
            * @param {JQuery} element - The Jquery object to add the modal click to.
            * @returns {JQuery} The Jquery object added to.
            */
            addClickModal: function (element) {
                var thisService = this;
                element.click(function () {
                    SoundEffectService.playSoundBite("click");
                    var content = itemModalContent($(this));
                    var id = $(this).attr("data-item-id");
                    if ($("#dialog-" + id).length > 0) {
                        var d = $("#dialog-" + id).dialog("moveToTop");
                        return;
                    }
                    content.attr("id", "dialog-" + id);
                    content.dialog({
                        position: { my: "center", at: "top+30%", of: window },
                        resizable: false,
                        open: function(event, ui){
                            var temp = $(".ui-dialog-titlebar-close", $(this).parent());
                            $(".ui-dialog-titlebar-close", $(this).parent()).addClass("btn btn-default").append("<i class='fa fa-times'></i>");
                            thisService.addTooltipAndClickModal($(".item-modal-builds-into-image"));
                            thisService.addTooltipAndClickModal($(".item-modal-image"));
                        },
                        close: function(event, ui){
                            $(this).parent().detach();
                        }
                    });
                });
            },
            
            /**
            * Adds right click context menu to elements within container.
            * @param {JQuery} container - The Jquery object of the container that the elements are in.
            * @param {string} elements - A selector of the elements to add the right click context menu to.
            */
            addItemContextMenu: function(container, elements){
                container.contextmenu({
                    delegate: elements,
                    menu: [
                        {title: "Remove", uiIcon: "fa fa-trash-o",
                        action: function(event, ui){
                            ui.target.remove();
                        }}
                    ]
                });
            },
            
            /**
            * Draws an item's build path.
            * @param {string} id - The id of the item to draw the build path of.
            * @param {boolean} isPlaceholder - If the tree is made of droppable placeholder divs.
            * @param {Jquery} selector - The Jquery selector of where to draw the build path.
            */
            drawBuildPath: function(id, isPlaceholder, selector) {
                var thisService = this;
                if(!ChartService.isLoaded()) return;
                
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Name');
                data.addColumn('string', 'Manager');
                data.addColumn('string', 'ToolTip');
                
                var layout = getItemBuildTree(id, isPlaceholder);
                if(layout == null || layout == undefined) return;
                data.addRows(layout);

                var chart = new google.visualization.OrgChart(selector[0]);
                chart.draw(data, {allowHtml:true, allowCollapse:false, nodeClass:"item-build-tree-node", selectedNodeClass:"item-build-tree-node" });
                
                // Make placeholders droppable
                if(isPlaceholder){
                    $(".item-placeholder").droppable({
                        accept: ".draggable-item",
                        greedy: true,
                        drop: function(event, ui){
                            $(this).empty();
                            var id = ui.draggable.attr("data-item-id");
                            var item  = ItemService.getItem(id);
                            var draggable = ui.draggable.clone();
                            draggable.removeClass("image-grayed");
                            draggable.addClass("item-copy");
                            draggable.attr("style", "width:" + item.image.w + "px;" +
                                "height:" + item.image.h + "px; background: url(img/" + item.image.sprite + ") no-repeat;" +
                                "background-position: -" + item.image.x + "px -" + item.image.y + "px;");
                            thisService.addItemContextMenu($("#workarea"), ".item-copy");
                            $(this).append(draggable);
                        }
                    });
                }
            }
        };
        
        return service;
    }]);
    
    /**
    * The sound effect service.
    */
    app.factory('SoundEffectService', [function () {

        var soundBites = {};

        // Define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list
        var html5_audiotypes = { 
            "mp3": "audio/mpeg",
            "mp4": "audio/mp4",
            "ogg": "audio/ogg",
            "wav": "audio/wav"
        };

        function createSoundBite(soundFiles) {
            var html5audio = $("<audio>");
            // Check support for HTML5 audio
            if (html5audio[0].canPlayType) { 
                $.each(soundFiles, function (index, file) {
                    var sourcel = $("<source>");
                    sourcel.attr('src', file);
                    if (file.match(/\.(\w+)$/i))
                        sourcel.attr('type', html5_audiotypes[RegExp.$1]);
                    html5audio.append(sourcel);
                });
                html5audio.trigger("load");
                html5audio.playClip = function () {
                    html5audio.trigger("pause");
                    html5audio.prop("currentTime", 0);
                    html5audio.trigger("play");
                };
                return html5audio;
            }
            return undefined;
        }

        return {
            addSoundBite: function (id, soundFiles, volume) {
                soundBites[id] = createSoundBite(soundFiles);
                this.setVolume(id, volume);
            },
            playSoundBite: function (id) {
                var bite = soundBites[id];
                if (bite == null || bite == undefined) return;
                bite.playClip();
            },
            setVolume: function (id, volume) {
                if (volume == null || volume == undefined) return;
                if (volume < 0) volume = 0;
                if (volume > 1) volume = 1;
                var bite = soundBites[id];
                if (bite == null || bite == undefined) return;
                bite.prop("volume", volume);
            }
        };
    }]);

})();