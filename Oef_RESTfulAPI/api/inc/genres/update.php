<?php
// --- "update" een genre  

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["GN_ID", "naam"]);

// create prepared statement
if (!$stmt = $conn->prepare("UPDATE Genre SET naam = ? WHERE GN_ID = ?")) {
    die(json_encode(["error" => "Prepared Statement failed on prepare", "status" => "fail"]));
}

// bind parameters ( s = string | i = integer | d = double | b = blob )
if (!$stmt->bind_param("si", $postvars['naam'], $postvars['GN_ID'])) {
    die(json_encode(["error" => "Prepared Statement failed on bind", "status" => "fail"]));
}
$stmt -> execute();

if ($conn->affected_rows == 0) {
    die(json_encode(["error" => "No rows affected", "status" => "fail"]));
}
// added
$stmt -> close();

// wat was de laatst toegevoegde ID?
$GN_ID = $conn -> insert_id;

// antwoord met een ok -> kijk na wat je in de client ontvangt
die('{"data":"ok","message":"Record updated successfully","status":200}');
?>