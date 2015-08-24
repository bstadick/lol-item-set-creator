/**
* Drag-drop item code
* @author Bryan Stadick
* @version 0.0.5
* @copyright © 2015 Bryan Stadick
*/
(function() {

    // The AngularJS module.
    var app = angular.module('builds', []);

    /**
    * The Google Charts API loader service.
    */
    app.factory('ChartService', function() {
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
    });
    
    /**
    * The item data set management service. 
    */
    app.factory('ItemService', function() {
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
                    var itemImg = service.getItemImage(item, "");
                    if(itemImg != null && itemImg != undefined)
                        entry = [{v:tree.id.toString(), f:itemImg[0].outerHTML}, '', ''];
                }
                tree.items.push(entry);
            }
            
            // Sub-entries
            if(item.from != null && item.from != undefined){
                $.each(item.from, function(index, value){
                    tree.id = tree.id + 1;
                    var childItem = service.getItem(value);
                    var entry;
                    if(isPlaceholder)
                        entry = [{v:tree.id.toString(), f:"<div class='item-placeholder' data-item-id='" + childItem.id +  "'></div>"}, parentId.toString(), ''];
                    else{
                        var itemImg = service.getItemImage(childItem, "item-modal-image");
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
            * Creates a Google orgchart tree array for the build of the given item id.
            * @param {string} id - The id of the item to create the build path for.
            * @return {Array} The Google orgchart tree array.
            */
            getItemBuildTree: function(id, isPlaceholder){
                var item = this.getItem(id);
                if(item == null || item == undefined) return undefined;
                
                var tree = createItemBuildTreeRecurse(item, null, 0, isPlaceholder);
                return tree.items;
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
            addItemSearchKey(itemLabel, itemValue){
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
    });
    
})();