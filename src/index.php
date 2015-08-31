<?php
error_reporting(E_ALL);

// debug/console library
include 'ChromePhp.php';
include 'ApiKey.php';
use LeagueWrap\Api;

require __DIR__.'\..\vendor\autoload.php';

try{
    // parameters
    if(empty($_POST['action'])) die("No action specified.");
    $action = $_POST['action'];
    //ChromePhp::log('action: ' . $action);
    //ChromePhp::log($_POST);

    switch($action) {
	    case "export":

		    $pageName = $_POST['pageName'];
		    if($pageName == null || trim($pageName) == "")
			    $pageName = "build_page";
		    else
			    $pageName = str_replace(" ", "_", $pageName);

            if(empty($_POST['data'])) die("No data specified.");

		    $fileName = $pageName . ".json";
		    // output headers so that the file is downloaded rather than displayed
		    header('Content-Type: text/plain; charset=utf-8');
		    header('Content-Disposition: attachment; filename=' . $fileName);
		    $output = fopen('php://output', 'w');
		    fputs($output, $_POST['data']);
		    break;
        case "getChampBuilds":
            header('Content-Type: application/json');
            $api = setupApi($myKey);
            $matchlistapi = $api->matchlist();
            $matchapi = $api->match();

            $matchlist = $matchlistapi->matchlist(492066, "RANKED_SOLO_5x5", "SEASON2015");
            $matchId = $matchlist->matches[0]->matchId;
            $match = $matchapi->match($matchId, true);
            $timeline = $match->timeline;
            if($timeline == null) throw new Exception("Match timeline not present.");
            $matchInfo = array("timeline" => $timeline, "participants" => $match->participantIdentities);

            $matchJson = json_encode($matchInfo);
            echo $matchJson;
            break;
    }
} catch(Exception $e){
    ChromePhp::log($e);
}

//Function to check if the request is an AJAX request
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function setupApi($myKey){
        $api = new Api($myKey); // load the API
        // Uncomment this line below to enable cache (requires memcached to be installed and configured)
        //$api->remember(3600);     // Set the cache to remember every request for 1 hour
        $api->setTimeout(10);     // Wait a maximum of 10 seconds for a response
        $api->attachStaticData(); // Tell the api to attach all static data
        //$api->limit(10, 10);      // Set a limit of 10 requests per 10 seconds
        //$api->limit(500, 600);    // Set a limit of 500 requests per 600 (10 minutes) seconds
        return $api;
}

?>