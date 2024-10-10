<?php
// --- "add" een boek  

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["BK_AU_ID", "BK_GN_ID", "titel", "code", "omschrijving"]);

// create prepared statement
if(!$stmt = $conn->prepare("insert into Boeken (BK_AU_ID, BK_GN_ID, titel, code, omschrijving) values (?,?,?,?,?)")){
	die('{"error":"Prepared Statement failed on prepare","errNo":' . json_encode($conn -> errno) .',"mysqlError":' . json_encode($conn -> error) .',"status":"fail"}');
}

// bind parameters ( s = string | i = integer | d = double | b = blob )
if(!$stmt -> bind_param("iisss", htmlentities($postvars['BK_AU_ID']), $postvars['BK_GN_ID'], $postvars['titel'], $postvars['code'], $postvars['omschrijving'])){
	die('{"error":"Prepared Statement bind failed on bind","errNo":' . json_encode($conn -> errno) .',"mysqlError":' . json_encode($conn -> error) .',"status":"fail"}');
}
$stmt -> execute();

if($conn->affected_rows == 0) {
	// add failed
	$stmt -> close();
	die('{"error":"Prepared Statement failed on execute : no rows affected","errNo":' . json_encode($conn -> errno) .',"mysqlError":' . json_encode($conn -> error) .',"status":"fail"}');
}
// added
$stmt -> close();

// wat was de laatst toegevoegde ID?
$BK_ID = $conn -> insert_id;

// antwoord met een ok -> kijk na wat je in de client ontvangt
die('{"data":"ok","message":"Record added successfully","status":200, "BK_ID": ' . $BK_ID . '}');
?>