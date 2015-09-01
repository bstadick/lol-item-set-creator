<?php
error_reporting(E_ALL);

// debug/console library
include 'ChromePhp.php';
include_once 'ApiKey.php';
include_once 'Database.php';
include_once 'MatchModel.php';

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
        case "shareBuild":
            if(empty($_POST['data'])) die("No data specified.");
            $shareSet = new ItemSetShare();
            $url = $shareSet->addItemSet($_POST['data']);
            echo json_encode($url);
            break;
        case "getBuild":
            if(empty($_POST['setId'])) die("No set specified.");
            $shareSet = new ItemSetShare();
            $set = $shareSet->getItemSet($_POST['setId']);
            echo json_encode($set);
            break;
    }
} catch(Exception $e){
    //ChromePhp::log($e);
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

?>