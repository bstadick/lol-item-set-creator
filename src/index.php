<?php
// debug/console library
include 'ChromePhp.php';

// parameters
if(empty($_POST['action'])) die("No action specified.");
$action = $_POST['action'];
ChromePhp::log('action: ' . $action);
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
}

?>