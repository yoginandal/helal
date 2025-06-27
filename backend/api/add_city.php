<?php
// backend/api/add_city.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';

function send_response($status, $message) {
    http_response_code($status);
    echo json_encode(['message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_response(405, 'Invalid request method.');
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->cityName) || empty(trim($data->cityName))) {
    send_response(400, 'City name cannot be empty.');
}

$cityName = trim($conn->real_escape_string($data->cityName));

// Check if city already exists
$checkStmt = $conn->prepare("SELECT id FROM cities WHERE cityName = ?");
$checkStmt->bind_param("s", $cityName);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
if ($checkResult->num_rows > 0) {
    send_response(409, "A city with the name '{$cityName}' already exists.");
}
$checkStmt->close();


// Insert new city
try {
    $stmt = $conn->prepare("INSERT INTO cities (id, cityName) VALUES (?, ?)");
    $cityId = uniqid('city_', true);
    $stmt->bind_param("ss", $cityId, $cityName);
    
    if ($stmt->execute()) {
        send_response(201, "City '{$cityName}' added successfully.");
    } else {
        throw new Exception("Failed to execute statement.");
    }
    $stmt->close();

} catch (Exception $e) {
    send_response(500, "Database error: Could not add city.");
}

$conn->close();
?> 