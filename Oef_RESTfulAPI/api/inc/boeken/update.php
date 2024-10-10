<?php
// --- "update" een boek  

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["BK_AU_ID", "BK_GN_ID", "titel", "code", "omschrijving"]);

// create prepared statement
if (!$stmt = $conn->prepare("UPDATE Boeken SET BK_AU_ID = ?, BK_GN_ID = ?, titel = ?, code = ?, omschrijving = ? WHERE BK_ID = ?")) {
    die(json_encode(["error" => "Prepared Statement failed on prepare", "status" => "fail"]));
}

// bind parameters ( s = string | i = integer | d = double | b = blob )
if (!$stmt->bind_param("iisssi", $postvars['BK_AU_ID'], $postvars['BK_GN_ID'], $postvars['titel'], $postvars['code'], $postvars['omschrijving'], $postvars['BK_ID'])) {
    die(json_encode(["error" => "Prepared Statement failed on bind", "status" => "fail"]));
}
$stmt -> execute();

if($conn->affected_rows == 0) {
	// add failed
	die(json_encode(["error" => "No rows affected", "status" => "fail"]));
}
// added
$stmt -> close();

// antwoord met een ok -> kijk na wat je in de client ontvangt
die('{"data":"ok","message":"Record updated successfully","status":200}');
?>