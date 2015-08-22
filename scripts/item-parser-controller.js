/**
* Drag-drop item code
* @author Bryan Stadick
* @version 0.0.5
* @copyright © 2015 Bryan Stadick
*/
(function() {

    // The AngularJS module.
    var app = angular.module('builds');
    
    /**
    * The item controller for managing items on the page
    */
    app.controller('ItemParserController', ['$scope', '$http', '$log', function($scope, $http, $log){
        var controller = this;
        
        /**
        * Initializes the controller.
        */
        controller.init = function(){
            
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
        
        controller.parseItemBuild = function(){
            var itemCollection = $("#item-build-tree .item-image");
            var count = itemCollection.length;
            var ids = [];
            itemCollection.each(function(index){
                ids[index] = $(this).attr("data-item-id");
            });
            // TODO - do something with the build tree data
        };
        
        controller.init();
        
    } ]);

})();