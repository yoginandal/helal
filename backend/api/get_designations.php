<?php
// backend/api/get_designations.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$query = "SELECT id, designationName as name FROM designations ORDER BY designationName ASC";
$result = $conn->query($query);

$designations = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $designations[] = $row;
    }
}

echo json_encode($designations);

$conn->close();
?> 