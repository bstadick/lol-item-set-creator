<?php

class ItemSetShare{
    private $conn;
    private $error;

    public function __construct(){
        global $db_servername;
        global $db_username;
        global $db_password;
        global $db_name;
        global $db_port;
        // Create connection
        $this->conn = new mysqli($db_servername, $db_username, $db_password, $db_name, $db_port);
        if($this->conn->connect_error){
            // connection error
            return;
        }
    }

    public function getErrorMsg(){
        return $this->error;
    }

    public function addItemSet($set){
        $this->error = null;
        $query = $this->conn->stmt_init();
        
        $query->prepare("INSERT INTO set_share VALUES (?, ?);");
        
        $data = NULL;
        $uuid = uniqid("", false);

        $query->bind_param("sb", $uuid, $data);

        $query->send_long_data(1, $set);

        if ($query->execute() === FALSE){
            // insert error
            $this->error = 'Error: ' . $query->error;
            $query->close();
            return NULL;
        }
        else{
            $query->close();
            return $uuid;
        }
    }

    public function getItemSet($uuid){
        $this->error = null;
        $query = "SELECT buildSet FROM set_share WHERE shareId = '" . $uuid . "';";

        $result = $this->conn->query($query);
        
        if (empty($result)){
            // insert error
            $this->error = "Error: " . $query . "<br>" . $this->conn->error;
            return null;
        }
        else if($result->num_rows > 0){
            $row = $result->fetch_assoc();
            return json_decode($row['buildSet']);
        }
        else{
            // no results
            return null;
        }
    }

}

class MatchHistoryModel{
    private $conn;
    private $error;

    public function __construct(){
        global $db_servername;
        global $db_username;
        global $db_password;
        global $db_name;
        global $db_port;
        // Create connection
        $this->conn = new mysqli($db_servername, $db_username, $db_password, $db_name, $db_port);
        if($this->conn->connect_error){
            // connection error
            return;
        }
    }

    public function getMatches(){
        return $this->matches;
    }

    public function getErrorMsg(){
        return $this->error;
    }
    
    // parse returned query results
    private function parseResults($result){
        $matches = array();
        while($row = $result->fetch_assoc()) {
            $summonerIds = array();
            $championIds = array();
            for($x = 1; $x <= 10; $x++){
                array_push($summonerIds, $row['s' . $x . 'Id']);
                array_push($championIds, $row['c' . $x . 'Id']);
            }
            $match = new Match($row['matchId'], $summonerIds, $championIds, $row['matchData'], $row['fetchTime']);
            array_push($matches, $match);
        }
        return $matches;
    }

    public function getAllMatches(){
        $this->error = null;
        $query = "SELECT * FROM match_history ORDER BY fetchTime DESC;";
        $result = $this->conn->query($query);
        
        if (empty($result)){
            // insert error
            $this->error = "Error: " . $query . "<br>" . $this->conn->error;
            return null;
        }
        else if($result->num_rows > 0){
            return $this->parseResults($result);
        }
        else{
            // no results
            return null;
        }
    }

    public function getMatchById($id){
        $this->error = null;
        $query = "SELECT * FROM match_history WHERE matchId = " . $id . " ORDER BY fetchTime DESC;";

        $result = $this->conn->query($query);
        
        if (empty($result)){
            // insert error
            $this->error = "Error: " . $query . "<br>" . $this->conn->error;
            return null;
        }
        else if($result->num_rows > 0){
            return $this->parseResults($result);
        }
        else{
            // no results
            return null;
        }
    }

    public function getMatchBySummonerId($id){
        $this->error = null;
        $query = "SELECT * FROM match_history WHERE ";
        for($x = 1; $x <= 10; $x++){
            if($x < 10)
                $query = $query . "s" . $x . "Id = " . $id . " OR ";
            else
                $query = $query . "s" . $x . "Id = " . $id;
        }
        $query = $query . " ORDER BY fetchTime DESC;";

        $result = $this->conn->query($query);
        
        if (empty($result)){
            // insert error
            $this->error = "Error: " . $query . "<br>" . $this->conn->error;
            return null;
        }
        else if($result->num_rows > 0){
            return $this->parseResults($result);
        }
        else{
            // no results
            return null;
        }
    }

    public function getMatchByChampionId($id){
        $this->error = null;
        $query = "SELECT * FROM match_history WHERE ";
        for($x = 1; $x <= 10; $x++){
            if($x < 10)
                $query = $query . "c" . $x . "Id = " . $id . " OR ";
            else
                $query = $query . "c" . $x . "Id = " . $id;
        }
        $query = $query . " ORDER BY fetchTime DESC;";

        $result = $this->conn->query($query);
        
        if (empty($result)){
            // insert error
            $this->error = "Error: " . $query . "<br>" . $this->conn->error;
            return null;
        }
        else if($result->num_rows > 0){
            return $this->parseResults($result);
        }
        else{
            // no results
            return null;
        }
    }

    public function getMatchBySummonerAndChampionId($summonerId, $championId){
        $this->error = null;
        $query = "SELECT * FROM match_history WHERE ";
        for($x = 1; $x <= 10; $x++){
            if($x < 10)
                $query = $query . "(s" . $x . "Id = " . $summonerId . " AND c" . $x . "Id = " . $championId . ") OR ";
            else
                $query = $query . "(s" . $x . "Id = " . $summonerId . " AND c" . $x . "Id = " . $championId . ")";
        }
        $query = $query . " ORDER BY fetchTime DESC;";

        $result = $this->conn->query($query);
        
        if (empty($result)){
            // insert error
            $this->error = "Error: " . $query . "<br>" . $this->conn->error;
            return null;
        }
        else if($result->num_rows > 0){
            return $this->parseResults($result);
        }
        else{
            // no results
            return null;
        }
    }

    public function addMatch($value){
        $this->error = null;
        $query = $this->conn->stmt_init();
        
        $query->prepare("INSERT INTO match_history VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
        $c = $value->getChampionIds();
        $s = $value->getSummonerIds();
        
        $data = NULL;
        $matchId = $value->getMatchId();
        $fetchTime = date('Y-m-d H:i:s');

        $query->bind_param("iiiiiiiiiiiiiiiiiiiiibs", $matchId,
            $c[0], $s[0], $c[1], $s[1], $c[2], $s[2], $c[3], $s[3], $c[4], $s[4], $c[5], $s[5],
            $c[6], $s[6], $c[7], $s[7], $c[8], $s[8], $c[9], $s[9], $data, $fetchTime);

        $query->send_long_data(21, $value->getMatchData());

        if ($query->execute() === FALSE){
            // insert error
            $this->error = 'Error: ' . $query->error;
            $query->close();
            return false;
        }
        else{
            $query->close();
            return true;
        }
    }

    public function addMatches($values){
        foreach($values as &$value){
            $this->addMatch($value);
        }
    }
}

class Match{
    private $_matchId;
    private $_summonerIds;
    private $_championIds;
    private $_matchData;
    private $_fetchTime;

    public function __construct($matchId, $summonerIds, $championIds, $matchData, $fetchTime){
        $this->_matchId = $matchId;
        $this->_summonerIds = $summonerIds;
        $this->_championIds = $championIds;
        $this->_matchData = $matchData;
        $this->_fetchTime = $fetchTime;
    }

    public function getMatchId() {return $this->_matchId;}
    public function getSummonerIds() {return $this->_summonerIds;}
    public function getChampionIds() {return $this->_championIds;}
    public function getMatchData() {return $this->_matchData;}
    public function getFetchTime() {return $this->_fetchTime;}

    public function setMatchId($value) {$this->_matchId = $value;}
    public function setSummonerIds($value) {$this->_summonerIds = $value;}
    public function setChampionIds($value) {$this->_championIds = $value;}
    public function setMatchData($value) {$this->_matchData = $value;}
    public function setFetchTime($value) {$this->_fetchTime = $value;}
}

?>