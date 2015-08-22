/**
* Drag-drop item code
* @author Bryan Stadick
* @version 0.0.5
* @copyright © 2015 Bryan Stadick
*/
(function() {

    // The AngularJS module.
    var app = angular.module('builds', []);

    
    app.factory('ChartService', function() {
        var loaded = false;
        return {
            
            /**
             * Loads the visualization module from the Google Charts API 
             * if available
             * @returns {boolean} - Returns true is successful, or false 
             * if not available
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
            isLoaded: function(){ return loaded; }
        };
    });
    
})();