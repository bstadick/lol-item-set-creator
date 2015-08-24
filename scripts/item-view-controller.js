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
    app.controller('ItemViewController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', function($scope, $http, $log, ChartService, ItemService){
        var controller = this;
        
        /**
        * Initializes the controller.
        */
        controller.init = function(){
            // Rename jquery ui widgets to avoid name collisions with bootstrap
            $.widget.bridge('uibutton', $.ui.button);
            $.widget.bridge('uitooltip', $.ui.tooltip);
        
            // Add the initial item drop section
            controller.addSection();
            
            // Load google tree view and draw initial view
            if(ChartService.loadGoogleVisualization())
                google.setOnLoadCallback(function(){});
            
            // Organize items by category
            ItemService.populateItemLists();
            
            
            // Setup the search completion
            var autoComplete = $("#storeSearch").autocomplete({
                source: ItemService.getItemSearchKeys(),
                minLength: 2,
                select: function(event, ui){
                    return false;
                }
            }).autocomplete("instance");
            
            // Render the items in the search completion
            autoComplete._renderItem = function( ul, item ) {
                var div = $( "div", ul );
                return div.append( ItemService.getItemImageById(item.value, "search-item-image") );
            };
            
            // Render the menu of the search completion
            autoComplete._renderMenu = function( ul, items ) {
                var that = this;
                ul.append($("<li class='item-search-autocomplete'><div>"));
                $.each( items, function( index, item ) {
                    if($("[data-item-id='" + item.value + "']", ul).length <= 0)
                        that._renderItemData( ul, item );
                });
                controller.itemImageAddHoverModal($(".search-item-image"));
            };
            
            // Resize the menu of the search completion
            autoComplete._resizeMenu = function(){
                var width = $("#storeSearch").outerWidth();
                this.menu.element.outerWidth(width);
            };
        };
        
        /**
        * Handler for when all the items have been added to the item store repeater.
        */
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            controller.itemImageAddHoverModal($(".item-image"));
        });       
        
        /**
        * Gets the item category list.
        * @returns {Array} The list of item shop categories with items.
        */
        controller.getItemCategories = function(){
            return ItemService.getCategories();
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
        * Draws a tree heirarchy.
        * @param {Array} layout - The Google orgchart layout array to draw.
        * @param {Jquery} selector - The Jquery selector of where to draw the chart.
        */
        controller.drawChart = function(layout, selector) {
            if(!ChartService.isLoaded()) return;
            
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
                    var item  = ItemService.getItem(id);
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
            
            controller.itemImageAddHoverModal($(".item-modal-image"));
        };
        
        /**
        * Adds hover tooltip and click modal to the elements specified by the selector.
        * @param {Jquery} selector - The Jquery selector object of the elements to add the tooltip and modal to.
        */
        controller.itemImageAddHoverModal = function(selector){
            selector.each(function(index){
                controller.addHoverToolTip($(this), controller.itemTooltipContent);
                controller.addClickModal($(this), controller.itemModalContent);
            });
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
            var item  = ItemService.getItem(id);
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
            var item  = ItemService.getItem(id);
            var modalDiv =  $("<div title='" + item["name"].replace("'", "&#39;") + " Cost: " + item.gold.total + " (" + item.gold.base + ")'></div>");
            
            var buildsIntoDiv = $("<div class='item-modal-builds-into'></div>");
            if(item.into != null && item.into != undefined){
                $.each(item.into, function(index, itemId){
                    buildsIntoDiv.append(ItemService.getItemImageById(itemId, "item-modal-builds-into-image"));
                });
            }
            modalDiv.append(buildsIntoDiv);
            controller.itemImageAddHoverModal($(".item-modal-builds-into-image"));
            
            // Build path
            var buildPath = $("<div class='item-modal-build-path'></div>");
            var layout = ItemService.getItemBuildTree(id, false);
            controller.drawChart(layout, buildPath);
            modalDiv.append(buildPath);
            
            // Item description
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