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
    app.controller('ItemStoreController', ['$scope', '$http', '$log', 'ChartService', 'ItemService', 'ItemInteractivityService', function($scope, $http, $log, ChartService, ItemService, ItemInteractivityService){
        var controller = this;        
        
        /**
        * Initializes the controller.
        */
        controller.init = function(){
            // Setup the search completion
            var autoComplete = $("#storeSearch").autocomplete({
                source: ItemService.getItemSearchKeys(),
                minLength: 2,
                select: function(event, ui){
                    return false;
                }
            }).autocomplete("instance");

            // Renders the items in the search completion
            autoComplete._renderItem = function( ul, item ) {
                var div = $( "div", ul );
                return div.append( ItemService.getItemImageById(item.value, "search-item-image") );
            };

            // Renders the menu of the search completion
            autoComplete._renderMenu = function( ul, items ) {
                var that = this;
                ul.append($("<li class='item-search-autocomplete'><div>"));
                $.each( items, function( index, item ) {
                    if($("[data-item-id='" + item.value + "']", ul).length <= 0)
                        that._renderItemData( ul, item );
                });
                ItemInteractivityService.addTooltipAndClickModal($(".search-item-image"));
            };

            // Resizes the menu of the search completion
            autoComplete._resizeMenu = function(){
                var width = $("#storeSearch").outerWidth();
                this.menu.element.outerWidth(width);
            };
        }

        /**
        * Handler for when all the items have been added to the item store repeater.
        */
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            ItemInteractivityService.addTooltipAndClickModal($(".item-image"));
        });
        
        /**
        * Gets the item category list.
        * @returns {Array} The list of item shop categories with items.
        */
        controller.getItemCategories = function(){
            return ItemService.getCategories();
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
    
})();