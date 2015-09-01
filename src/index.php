<?php
error_reporting(E_ALL);

// debug/console library
include 'ChromePhp.php';
include_once 'ApiKey.php';
include_once 'Database.php';
include_once 'MatchModel.php';
use LeagueWrap\Api;

require '..\vendor\autoload.php';

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
            $numberToReturn = 40;

            $champId = $_POST["id"];

            $summoners = array(492066);

            $api = setupApi($myKey);
            $matchlistapi = $api->matchlist();
            $matchapi = $api->match();

            $matchHistory = new MatchHistoryModel();
            $matchListFromHist = $matchHistory->getMatchByChampionId($champId);
            $matches = array();
            
            if($matchListFromHist != null && count($matchListFromHist) > 0){
                $fetchTime = new DateTime($matchListFromHist[0]->getFetchTime());
                $currentTime = new DateTime(date('Y-m-d H:i:s'));
                $diff = $currentTime->getTimestamp() - $fetchTime->getTimestamp();

                // Refresh with newer matches if old enough
                if($diff > 3600){
                    
                    $matchCount = 0;
                    foreach($summoners as &$summoner){
                        $matchlist = $matchlistapi->matchlist($summoner, "RANKED_SOLO_5x5", "SEASON2015", $champId, null, null, $fetchTime->getTimestamp()*1000, time()*1000);
                        foreach($matchlist->matches as &$match){
                            if($count > 10){
                                sleep(1);
                                $count = 0;
                            }
                            $count++;

                            $matchDetails = $matchapi->match($match->matchId, true);
                            addToDatabase($matchDetails, $matchHistory);

                            // Add to list of matches to return
                            array_push($matches, $matchDetails);
                            $matchCount++;
                            if($matchCount > $numberToReturn) break;
                        }
                        if($matchCount > $numberToReturn) break;
                    }
                }

                // Fill in rest of needed matches with cached matches
                $neededMatches = $numberToReturn - count($matches);
                if(count($matchListFromHist) < $neededMatches) $neededMatches = count($matchListFromHist);
                for($x = 0; $x < $neededMatches; $x++){
                    array_push($matches, json_decode($matchListFromHist[$x]->getMatchData()));
                }
            }
            else{
                // no matches cached so get all new
                $matchCount = 0;
                foreach($summoners as &$summoner){
                    $matchlist = $matchlistapi->matchlist($summoner, "RANKED_SOLO_5x5", "SEASON2015", $champId);
                    $count = 0;
                    foreach($matchlist->matches as &$match){
                        if($count > 10){
                            sleep(1);
                            $count = 0;
                        }
                        $count++;

                        $matchDetails = $matchapi->match($match->matchId, true);
                        addToDatabase($matchDetails, $matchHistory);

                        // Add to list of matches to return
                        array_push($matches, $matchDetails);
                        $matchCount++;
                        if($matchCount > $numberToReturn) break;
                    }
                    if($matchCount > $numberToReturn) break;
                }
            }

            echo json_encode($matches);
            break;
    }
} catch(Exception $e){
    ChromePhp::log($e);
}

function addToDatabase($matchDetails, $matchHistory){
    // Parse match details into the database
    $summonerIds = array();
    $champIds = array();
    for($x = 1; $x <= 10; $x++){
        $participant = $matchDetails->participant($x);
        $identity = $matchDetails->identity($x);
        $player = $identity->player;
        array_push($champIds, $participant->championId);
        array_push($summonerIds, $player['summonerId']);
    }

    $matchModel = new Match($matchDetails->matchId, $summonerIds, $champIds, json_encode($matchDetails), date('Y-m-d H:i:s'));
    $matchHistory->addMatch($matchModel);
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