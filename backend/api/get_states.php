<?php
// backend/api/get_states.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$query = "SELECT id, stateName FROM states ORDER BY stateName ASC";
$result = $conn->query($query);

$states = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $states[] = $row;
    }
}

echo json_encode($states);

$conn->close();
?> 