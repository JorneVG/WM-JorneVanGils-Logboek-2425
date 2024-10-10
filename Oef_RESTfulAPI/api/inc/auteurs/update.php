<?php
// --- "update" een auteur  

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["voornaam", "familienaam", "geboortejaar"]);

// create prepared statement
if (!$stmt = $conn->prepare("UPDATE Auteurs SET voornaam = ?, familienaam = ?, geboortejaar = ? WHERE AU_ID = ?")) {
    die(json_encode(["error" => "Prepared Statement failed on prepare", "status" => "fail"]));
}

// bind parameters ( s = string | i = integer | d = double | b = blob )
if (!$stmt->bind_param("ssii", $postvars['voornaam'], $postvars['familienaam'], $postvars['geboortejaar'], $postvars['AU_ID'])) {
    die(json_encode(["error" => "Prepared Statement failed on bind", "status" => "fail"]));
}
$stmt -> execute();

if ($conn->affected_rows == 0) {
    die(json_encode(["error" => "No rows affected", "status" => "fail"]));
}
// added
$stmt -> close();

// antwoord met een ok -> kijk na wat je in de client ontvangt
die('{"data":"ok","message":"Record updated successfully","status":200}');
?>