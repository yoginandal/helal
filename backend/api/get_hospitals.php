<?php
// backend/api/get_hospitals.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$query = "SELECT id, hospitalName FROM hospitals ORDER BY hospitalName ASC";
$result = $conn->query($query);

$hospitals = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $hospitals[] = $row;
    }
}

echo json_encode($hospitals);

$conn->close();
?> 