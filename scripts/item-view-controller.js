/**
* Drag-drop item code
* @author
* @version 0.0.5
* @copyright © 2015
*/
(function() {

    // The AngularJS module.
    var app = angular.module('builds');
    
    /**
    * The item controller for managing items on the page.
    */
    app.controller('ItemViewController', ['$scope', '$http', '$log', 'ChartService', function($scope, $http, $log, ChartService){
        var controller = this;

        /**
        * List of items in the item store repeater.
        */
        controller.items = items;
        
        /**
        * List of the store categories.
        */
        controller.storeCategories = itemCategories;
        
        /**
        * Layout of the build tree.
        */
        controller.buildLayout = "linearOne";
        
        /**
        * If Google charts has been loaded;
        */
        controller.googleChartsLoaded = false;
        
        /**
        * Initializes the controller.
        */
        controller.init = function(){
            // Rename jquery ui widgets to avoid name collisions with bootstrap
            $.widget.bridge('uibutton', $.ui.button);
            $.widget.bridge('uitooltip', $.ui.tooltip);
        
            // Add the initial item drop section
            controller.addSection();
            
            // Populate buildLayout dropdown selector
            $.each( buildLayouts, function(key, value){
                var option;
                if(key == "linearOne")
                    option = $("<option value='" + key + "' selected='selected'>" + value.name + "</option>");
                else
                    option = $("<option value='" + key + "'>" + value.name + "</option>");
                $("#layout").append(option);
            });
            
            // Set as select menu
            $("#layout").selectmenu({
                change: function(event, data){
                    controller.buildLayout = data.item.value;
                    if(ChartService.isLoaded())
                        controller.drawChart();
                }
            }).selectmenu( "menuWidget" ).addClass( "select-menu-overflow " );
            
            // Load google tree view and draw initial view
            if(ChartService.loadGoogleVisualization())
                google.setOnLoadCallback(function(){controller.googleChartsLoaded = true;});
            
            var allItems = $.grep(controller.storeCategories, function(e){return e.id.toLowerCase()  == "all";});
            
            // Organize items by category
            $.each(controller.items.data, function(itemKey, itemValue){
                if(allItems != null && allItems != undefined && allItems.length > 0){
                    allItems[0].items[allItems[0].items.length] = itemValue;
                }
                if(itemValue.tags != null && itemValue.tags != undefined){
                    $.each(itemValue.tags, function(index, value){
                        // Find category in store
                        var result = $.grep(controller.storeCategories, function(e){return e.id.toLowerCase()  == value.toLowerCase();});
                        if(result != null && result != undefined && result.length > 0){
                            result[0].items[result[0].items.length] = itemValue;
                            // Find parent category in store
                            var parent = $.grep(controller.storeCategories, function(e){return e.id.toLowerCase()  == result[0].parentId.toLowerCase();});
                            if(parent != null && parent != undefined && parent.length > 0){
                                // Check if item is already in the parent category item list
                                var parentItem = $.grep(parent[0].items, function(e){return e.id == itemValue.id;});
                                if(parentItem == null || parentItem == undefined || parentItem.length <= 0){
                                    parent[0].items[parent[0].items.length] = itemValue;
                                }
                            }
                        }
                    });
                }
            });
        };
        
        /**
        * Creates a Google orgchart tree array for the build of the given item id.
        * @param {string} itemId - The id of the item to create the build path for.
        * @return {Array} The Google orgchart tree array.
        */
        controller.createItemBuildTree = function(itemId){
            var item = controller.items.data[itemId.toString()];
            var tree = controller.createItemBuildTreeRecurse(item, null, 0);
            return tree.items;
        }
        
        /**
        * Creates a tree hierarchy from the provided item.
        * @param {Object} item - The root item to create the tree for.
        * @param {Object} tree - The tree object that is being created. Initial call should be null.
        * @param {int} parentId - The id of the parent node in the tree.
        * @returns {Object} The tree object that is being created
        */
        controller.createItemBuildTreeRecurse = function(item, tree, parentId){
            // Root entry
            if(tree == null){
                tree = { id: 1, items: [] };
                parentId = tree.id;
                var entry = [{v:tree.id.toString(), f:"<div class='item-placeholder' data-item-id='" + item.id + "'></div>"}, '', ''];
                tree.items[tree.items.length] = entry;
            }
            // Sub-entries
            if(item.from != null && item.from != undefined){
                $.each(item.from, function(index, value){
                    tree.id = tree.id + 1;
                    var entry = [{v:tree.id.toString(), f:"<div class='item-placeholder' data-item-id='" + value +  "'></div>"}, parentId.toString(), ''];
                    tree.items[tree.items.length] = entry;
                    tree = controller.createItemBuildTreeRecurse(controller.items.data[value], tree, tree.id);
                });
            }
            return tree;
        };
        
        /**
        * Draws a tree heirarchy.
        * @param {Array} layout - The Google orgchart layout array to draw.
        * @param {Jquery} selector - The Jquery selector of where to draw the chart.
        */
        controller.drawChart = function(layout, selector) {
            if(!controller.googleChartsLoaded) return;
            
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('string', 'Manager');
            data.addColumn('string', 'ToolTip');
            
            if(layout == null || layout == undefined) return;
            data.addRows(layout);

            var chart = new google.visualization.OrgChart(selector[0]);
            chart.draw(data, {allowHtml:true, allowCollapse:false, nodeClass:"item-build-tree-node", selectedNodeClass:"item-build-tree-node" });
            
            // Make placeholders droppable
            $(".item-placeholder").droppable({
                accept: ".draggable-item",
                greedy: true,
                drop: function(event, ui){
                    $(this).empty();
                    var id = ui.draggable.attr("data-item-id");
                    var item  = controller.items.data[id];
                    var draggable = ui.draggable.clone();
                    draggable.removeClass("image-grayed");
                    draggable.addClass("item-copy");
                    draggable.attr("style", "width:" + item.image.w + "px;" +
                        "height:" + item.image.h + "px; background: url(img/" + item.image.sprite + ") no-repeat;" +
                        "background-position: -" + item.image.x + "px -" + item.image.y + "px;");
                    controller.addItemContextMenu($("#workarea"), ".item-copy");
                    $(this).append(draggable);
                }
            });
        };
        
        /**
        * Handler for when all the items have been added to the item store repeater.
        */
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            $(".item-image").each(function(index){
                controller.addHoverToolTip($(this), controller.itemTooltipContent);
                controller.addClickModal($(this), controller.itemModalContent);
            });
        });

        /**
        * Adds a new item section to the item workarea.
        */
        controller.addSection = function(){
            var workArea = $("#item-workarea");
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
                containment: "#item-workarea",
                update: function(event, ui){
                    //controller.addHoverToolTip(ui.item, controller.itemTooltipContent);
                    if(!ui.item.hasClass("item-copy"))
                        ui.item.addClass("item-copy");
                    controller.addItemContextMenu($("#workarea"), ".item-copy");
                }
            });
            section.append(dropSection);
            
            workArea.append(section);
            
            var workParent = workArea.parent();
            workParent.scrollTop(workParent[0].scrollHeight);
        };

        /**
        * Adds right click context menu to elements within container.
        * @param {JQuery} container - The Jquery object of the container that the elements are in.
        * @param {string} elements - A selector of the elements to add the right click context menu to.
        */
        controller.addItemContextMenu = function(container, elements){
            container.contextmenu({
                delegate: elements,
                menu: [
                    {title: "Remove", uiIcon: "fa fa-trash-o",
                    action: function(event, ui){
                        ui.target.remove();
                    }}
                ]
            });
        };
        
        
        /**
        * Adds a tooltip on hover to the element.
        * @param {JQuery} element - The Jquery object to add the tooltip to.
        * @param {tooltipContentCallback} tipContent - The callback function that creates the content for the tooltip.
        * @returns {JQuery} The Jquery object added to.
        */
        controller.addHoverToolTip = function(element, tipContent){
            element.uitooltip({
                items: '*',
                content: tipContent(element),
                open: function(event, ui){
                    setTimeout(function(){ $(ui.tooltip).hide("fade"); }, 3000);
                }
            });
            return element;
        };

        /**
        * This callback creates the content for the tooltip.
        * @callback tooltipContentCallback
        * @param {JQuery} element - The Jquery object the tooltip content is to be added to.
        * @returns {string} The content to add to the tooltip.
        */

        /**
        * The callback used to create the content for the item tooltips.
        * @param {JQuery} element - The Jquery object the tooltip content is to be added to.
        * @returns {string} The content to add to the tooltip.
        * @see tooltipContentCallback
        * @see addHoverToolTip
        */
        controller.itemTooltipContent = function(element){
            var id = element.attr("data-item-id");
            var item  = controller.items.data[id];
            if(item == null || item == undefined) return "";
            return item["name"];
        };
        
        /**
        * Adds a click modal to the element.
        * @param {JQuery} element - The Jquery object to add the modal click to.
        * @param {tooltipContentCallback} tipContent - The callback function that creates the content for the modal.
        * @returns {JQuery} The Jquery object added to.
        */
        controller.addClickModal = function(element, modalContent){
            element.click(function(){
                var content = modalContent($(this));
                var id = $(this).attr("data-item-id");
                if($("#dialog-" + id).length > 0) return;
                content.dialog({
                    position: { my: "center", at: "top+30%", of: window },
                    resizable: false,
                    open: function(event, ui){
                        $(this).parent().attr("id", "dialog-" + id);
                        var temp = $(".ui-dialog-titlebar-close", $(this).parent());
                        $(".ui-dialog-titlebar-close", $(this).parent()).addClass("btn btn-default").append("<i class='fa fa-times'></i>");
                    },
                    close: function(event, ui){
                        $(this).parent().detach();
                    }
                });
            });
        };
        
        /**
        * This callback creates the content for the click modal.
        * @callback modalContentCallback
        * @param {JQuery} element - The Jquery object the modal content is to be added to.
        * @returns {string} The content to add to the modal.
        */

        /**
        * The callback used to create the content for the click modals.
        * @param {JQuery} element - The Jquery object the modal content is to be added to.
        * @returns {string} The content to add to the modal.
        * @see modalContentCallback
        * @see addClickModal
        */
        controller.itemModalContent = function(element){
            var id = element.attr("data-item-id");
            var item  = controller.items.data[id];
            var modalDiv =  $("<div title='" + item["name"] + "'></div>");
            
            // TODO - add builds-into info
            modalDiv.append($("<div class='item-modal-builds-into'></div>"));
            // Build path
            // TODO - add items pictures to build tree
            var buildPath = $("<div class='item-modal-build-path'></div>");
            var layout = controller.createItemBuildTree(id);
            controller.drawChart(layout, buildPath);
            modalDiv.append(buildPath);
            // Item description
            // TODO - add item costs
            modalDiv.append(item["description"]);
            
            return modalDiv;
        };
        
        // Initialize the controller
        controller.init();
    
    } ]);
    
    /**
    * The item directive for handling actions taken after each item is added to the store.
    */
    app.directive('storeItemDraggable', function($timeout){
        function link(scope, element, attrs){
            var el = angular.element(element);
            //if(!itemList[scope.$index].isSectionDivider){
                el.draggable({
                    revert: 'invalid',
                    connectToSortable: '.item-drop-section',
                    snap: true,
                    helper: 'clone',
                    appendTo: 'body',
                    start:function(){
                        $(this).addClass("image-grayed");
                    },
                    stop:function(){
                        $(this).removeClass("image-grayed");
                    }
                });
            //}
            
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
        return {
            restrict: 'A',
            link: link
        };
    });
    
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
    
})();