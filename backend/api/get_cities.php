<?php
// backend/api/get_cities.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$query = "SELECT id, cityName as name FROM cities ORDER BY cityName ASC";
$result = $conn->query($query);

$cities = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $cities[] = $row;
    }
}

echo json_encode($cities);

$conn->close();
?> 