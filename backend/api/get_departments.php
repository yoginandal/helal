<?php
// backend/api/get_departments.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$query = "SELECT id, departmentName FROM departments ORDER BY departmentName ASC";
$result = $conn->query($query);

$departments = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $departments[] = $row;
    }
}

echo json_encode($departments);

$conn->close();
?> 