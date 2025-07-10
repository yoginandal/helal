<?php
// backend/api/get_doctors.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$query = "SELECT id, doctorName as name, specialty, department, image, city, hospital, experience, currentPosition, degree, state, expertise FROM doctors ORDER BY doctorName ASC";
$result = $conn->query($query);

$doctors = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }
}

echo json_encode($doctors);

$conn->close();
?> 